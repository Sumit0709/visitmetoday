

exports.sendOtp = async (req, res) => {

    const email = req.body.user.email;
    const mobileNumber = req.body.user.mobileNumber;
    const otp = req.otpvale;

    console.log("send Otp on email ", email, " OTP value = ", otp)

}