const multer  = require('multer')

const ProfessionalProfile = require("../../../model/professionalProfile");
const variable = require("../../../../variable")

const {allUser} = require("../../ViewController")

exports.updateProfessionalProfilePhoto = (req, res, next) => {

    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }
    const user = req.body.user;
    const signupId = user._id;
    const professionalProfileId = user.professionalProfileId
    // console.log(signupId);

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
    }).single("photo");


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
            ProfessionalProfile.findByIdAndUpdate(professionalProfileId,{photo: req.file.buffer}, {upsert: false, new: true})
                .exec()
                .then(result => {
                    if(result){
                        // update successfull
                        req.body.user = user;
                        next()
                        // return res.status(200).json({
                        //     success: true,
                        //     message: "Profile photo updated successfully"
                        // })
                    }
                    else{
                        return res.status(401).json({
                            success: false,
                            error: "Something went wrong while updating propfile photo"
                        })
                    }
                })
                .catch(err => {
                    return res.status(401).json({
                        success: false,
                        error: err.message
                    })
                })
        }
    })
}