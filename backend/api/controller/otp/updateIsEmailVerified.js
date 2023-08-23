const Signup = require("../../model/signup");
const Verification = require('../../model/verification')


const updateVerificationDocument = async (verificationId) => {

    Verification.findByIdAndUpdate(verificationId, {
        signupEmail: true
    })
    .then(result => {
        console.log("Verification Document updated successfully")
    })
    .catch(err => {
        console.log(err);
    })
}


exports.updateIsEmailVerified = async (req, res) => {

    const user = req.body.user;
    const verificationId = user.verificationId;

    Signup.findByIdAndUpdate(user._id,{
        isEmailVerified: true
    },{upsert: false, new: true})
    .exec()
    .then(result => { 
        updateVerificationDocument(verificationId);
        if(result && result.isEmailVerified){
            return res.status(200).json({
                success: true,
                message: "Email has been successfully verified"
            })
        }else{
            return res.status(401).json({
                success: false,
                error: "Email verification failed"
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            success: false,
            error: "Email verification failed"
        })
    })

}