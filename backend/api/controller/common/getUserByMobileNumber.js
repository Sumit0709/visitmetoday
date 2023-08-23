const Signup = require("../../model/signup");



exports.getUserByMobileNumber = async (req, res, next) => {

    const mobileNumber = req.body.emailOrMobile;
    
    Signup.findOne({mobileNumber: mobileNumber}).exec()
        .then(user => {
            if(user){
                if(user.isActive === false){
                    // user has deleted their account
                    return res.status(409).json({
                        success: false,
                        error: "Account is not active, Please contact Admin."
                    })
                }
                else{
                    req.body.user = user;
                    next();
                }
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "User doesn't exist for this mobile Number"
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