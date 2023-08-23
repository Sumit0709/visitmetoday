const QRCode = require("qrcode");
const Profile = require("../../model/profile");

const {allUser} = require("../ViewController")

exports.generateQrCode = async (req, res, next) => {

    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // VALUES FOR QR CODE
    const errorCorrectionLevel = req.body.errorCorrectionLevel? req.body.errorCorrectionLevel: 'M';
    
    const dark = req.body.dark? req.body.dark: '#000000';
    const light = req.body.light? req.body.light: "#FFFFFF";
    const type = req.body.type? req.body.type: "png";
    const margin = req.body.margin? parseInt(req.body.margin): 3;
    const width = req.body.width? parseInt(req.body.width): 500;
    const url = req.body.profileUrl? req.body.profileUrl: "https://visitme.today";

    // console.log("URL ",url)

    const profileId = req.body.user.profileId;

    const fl = "./qr_img/";
    const qr_options = {
        errorCorrectionLevel,
        version: "auto",
        mode: 'auto',
        color:{
            dark,
            light
        },
        type,
        quality: 0.95,
        margin,
        width
    }

    QRCode.toDataURL(url,qr_options)
        .then(url => {
            if(url){
                // save url into database
                Profile.findByIdAndUpdate(profileId,{
                    qrCodeUrl: url
                },{upsert:false, new: true})
                .exec()
                .then(result => {
                    if(result){

                        console.log("QR code generated successfully")
                        req.props.qrCodeUrl = url
                        try{
                            next()
                        }
                        catch{
                            return res.status(401).json({
                                success: false,
                                error: "ERROR IN CARD CREATION"
                            })
                        }

                    }
                    else{
                        console.log("Error in updating profile, QR code is not assigned to the user")
                        return res.status(401).json({
                            success: false,
                            error: "Error in updating profile, QR code is not assigned to the user"
                        })
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    return res.status(401).json({
                        success: false,
                        error: "Error in updating profile, QR code is not assigned to the user"
                    })
                })
            }
            else{
                console.log("Error in generating QR code")
                return {
                    success:false,
                    error: "Error in generating QR code"
                }
            }
        })
        .catch(err => {
            console.log(err.message)
            return {
                success:false,
                error: err.message
            }
        })
}
