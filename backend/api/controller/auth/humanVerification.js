

exports.humanVerification = (req, res, next) => {

    // const recaptchaValue  = req.body.recaptchaValue;
    // if(recaptchaValue == null || recaptchaValue == undefined || recaptchaValue == ""){
    //     res.status(403).json({
    //         success: false,
    //         error: "Please complete Captcha"
    //     })
    // }

    // // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`;
    // const url = "https://www.google.com/recaptcha/api/siteverify";

    // fetch(url,{
    //     method:"POST",
    //     headers: {
    //         secret: process.env.RECAPTCHA_SECRET_KEY,
    //         response:recaptchaValue
    //     }
    // })
    // .then(response => response.json())
    // .then(recaptchaVerificationResult => {
    //     if(recaptchaVerificationResult.success == true){
    //         next();
    //     }
    //     else{
    //         return res.status(401).json({
    //             success: false,
    //             error: "Captcha verification failed."
    //         })
    //     }
    // })
    // .catch(err => {
    //     return res.status(500).json({
    //         success: false,
    //         error: "Something Went Wrong."
    //     })
    // })
}