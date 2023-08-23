const { superAdmin } = require("../../ViewController");
const multer  = require('multer');
const paymentDetails = require("../../../model/paymentDetails");

const variable = require('../../../../variable');


exports.updatePaymentDetails = async (req, res) => {

    const viewResult = superAdmin(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const user = req.body.user;

    const storage = multer.memoryStorage();
    const myFileFilter = (req, file, cb) => {
        // console.log("FILE : ");
        // console.log(file);

        const allowedMIME = variable.validFileMIMEType;
        if(allowedMIME.includes(file.mimetype)){
            return cb(null, true)
        }
        console.log("DIDN'T MATCH")
        return cb({
            success: false,
            error: "Invalid mime type"
        }, false)
    }
    const upload = multer({
        storage: storage, 
        fileFilter: myFileFilter,
        limits: {
            fileSize: variable.maxFileSizeInBytes,  
        },
    }).single("qrCode");

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError){

            if (err.code == 'LIMIT_FILE_SIZE') {
                return res.status(401).json({
                    success: false,
                    error: 'File Size is too large',
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: err
                })
            }
        }
        else if(err){
            return res.status(401).json({
                success: false,
                error: err,
                message: "Something went wrong while uploading file"
            })
        }
        else if(!req.file){
            return res.status(401).json({
                success: false,
                error: "File missing"
            })
        }
        else{

            paymentDetails.find({}).exec()
                .then(result => {
                    if(result.length == 0){
                        // There is no Payment details in the database, so create new
                        
                        const pd = new paymentDetails({
                            qrCode: req.file.buffer,
                            updatedBy: user._id,
                            name: req.body.name,
                            upiId: req.body.upiId,
                            mobileNumber: req.body.mobileNumber
                        })

                        pd.save()
                            .then(result => {
                                if(result){
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Payment details updated successfully',
                                        doc: result
                                    })
                                }
                                else{
                                    return res.status(401).json({
                                        success: false,
                                        error: 'Failed while creating new document'
                                    })
                                }
                            })
                            .catch(err => {
                                return res.status(401).json({
                                    success: false,
                                    error: err
                                })
                            })

                    }else if(result.length == 1){
                        // Payment detail already exists, so update that one
                        console.log(result[0]._id)
                        const paymentDetailsId = result[0]._id;

                        paymentDetails.findByIdAndUpdate(paymentDetailsId,{
                            qrCode: req.file.buffer,
                            updatedBy: user._id,
                            name: req.body.name,
                            upiId: req.body.upiId
                        },{upsert: false, new: true}).exec()
                            .then(updatedDoc => {
                                if(updatedDoc){
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Payment details updated successfully',
                                        doc: updatedDoc
                                    })
                                }
                                else{
                                    return res.status(401).json({
                                        success: false,
                                        error: 'Failed while updating existing document'
                                    })
                                }
                            })
                            .catch(err => {
                                return res.status(401).json({
                                    success: false,
                                    error: err
                                })
                            })

                    }
                    else{
                        return res.status(401).json({
                            success: false,
                            error: `Multiple payment details exist in database: ${result.length}`
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        success: false, 
                        error: err.message
                    })
                })
        }
    })
}