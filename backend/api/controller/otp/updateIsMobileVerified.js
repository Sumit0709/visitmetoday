const Signup = require("../../model/signup");
const Verification = require('../../model/verification')


const updateVerificationDocument = async (verificationId) => {

    Verification.findByIdAndUpdate(verificationId, {
        signupMobile: true
    })
    .then(result => {
        console.log("Verification Document updated successfully")
    })
    .catch(err => {
        console.log(err);
    })
}


exports.updateIsMobileVerified = async (req, res) => {

    const user = req.body.user;
    const verificationId = user.verificationId;


    Signup.findByIdAndUpdate(user._id,{
        isMobileNumberVerified: true
    },{upsert: false, new: true})
    .exec()
    .then(result => { 
        updateVerificationDocument(verificationId);
        if(result && result.isMobileNumberVerified){
            return res.status(200).json({
                success: true,
                message: "Mobile number has been successfully verified"
            })
        }else{
            return res.status(401).json({
                success: false,
                error: "Mobile number verification failed"
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            success: false,
            error: "Mobile number verification failed"
        })
    })

}
