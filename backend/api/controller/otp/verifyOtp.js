const Otp = require("../../model/otp");
const { validateOtp } = require("../requestValidator/authValidator");


const deleteOtp = async (otpId) => {

    Otp.findByIdAndDelete(otpId)
        .exec()
        .then(result => {
            console.log("OTP deleted Successfully")
        })
        .catch(err => {
            console.log("Error in deleting OTP")
            console.log(err);
        })

}


exports.verifyOtp = async (req, res, next) => {
    const result = await validateOtp(req.body);

    if(!result.success){
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }

    const userId = req.body.user._id;
    const otpFor = req.body.otpFor;
    const otpValue = req.body.otpValue;

    // console.log(req.body);

    const currTime = new Date();

    Otp.findOne({signupId: userId, for: otpFor, otpValue: otpValue })
        .exec()
        .then(result => {
            if(result){
                // const isOtpExpired = currTime.getTime() > result.expiryTime.getTime();
                const isOtpExpired = currTime.getTime() > result.expiryTime;
                if(isOtpExpired){
                    return res.status(401).json({
                        success: false,
                        error: "OTP expired, please generate new Otp"
                    })
                }else{
                    deleteOtp(result._id)
                    // return res.status(200).json("OTP verified");
                    next();
                }
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "Incorrect Otp"
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Something went wrong"
            })
        })
}