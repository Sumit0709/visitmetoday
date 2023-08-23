const variable = require("../../../variable");
const Otp = require("../../model/otp");
const {validateOtp} = require("../requestValidator/authValidator")

const {allUser} = require("../ViewController")

const deleteOtp = async (otpId) => {
    Otp.findByIdAndDelete(otpId)
    .then(deletedOtp => {
        if(deletedOtp){
            console.log("Otp deleted");
        }
        else {
            console.log("Error in deleting otp")
        }
    })
    .catch(err => {
        console.log("Error in deleting otp -> catch")
        console.log(err.message)
    })

    // otp has been verifies successfully so it will always be a success message
}


exports.verifyOtp = async (req, res) => {

    // checking is req.body is valid
    const result = await validateOtp(req.body);

    if(!result.success){
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }

    const user = req.body.user;
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // check if a valid otp for this user is there into our database
    Otp.findOne({
        signupId: user._id,
        otpValue: req.body.otpValue,
        for: req.body.for
    }).then(result => {
        if(result){
            // otp is there into the database, so it's a success
            // we will delete it from database asynchronously
            // Otp's will also be automatically deleted from the database after specified time, if something went wrong here
            
            deleteOtp(result._id)

            return res.status(200).json({
                success: true,
                message: "OTP verified successfully"
            });
            
                // next(); to perfom the action afterward i.e. reset password, verify signup email, mobileNumber
        }
        else{
            return res.status(500).json({
                success: false,
                error: "incorrect OTP"
            })
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        })
    })
}