const Signup = require("../../model/signup")
const Verification = require("../../model/verification")
const {validateUpdateSignupMobile} = require("../requestValidator/authValidator");

const {allUser} = require("../ViewController")

exports.updateSignupMobile = async (req, res) => {
    
    const result = await validateUpdateSignupMobile(req.body);

    if(result.success){
        
        try{
            const user = req.body.user;

            // Controller for view
            const viewResult = allUser(req,res);
            if(viewResult.success == false){
                return res.status(401).json(viewResult);
            }

            Signup.findByIdAndUpdate(user._id,{ mobileNumberCountryCode: req.body.newMobileNumberCountryCode ,mobileNumber: req.body.newMobileNumber},{new: true})
                .exec()
                .then(newUser => {
                    // console.log(newUser);
                    if(newUser){
                        //TODO:: SEND MOBILE NUMBER UPDATED SUCCESSFULLY EMAIL 

                        res.status(200).json({
                            success: true,
                            message: "Mobile number has been successfully updated"
                        })

                        // reset verification of mobileNumber to be false
                        // if verifcation document corresponding to this user doesnot exist, it will be created (upsert = true)
                        Verification.findByIdAndUpdate(user.verificationId,{signupMobile: false},{upsert:true, new:true});

                        return res;

                        // In any case we will return success message, as update is successfull, do we hav to execute commented code??

                        // .exec()
                        // .then(result => {
                        //     console.log(result);
                        //     return res;
                        // })
                        // .catch(err => {
                        //     console.log(err);
                        //     return res.status(500).json({
                        //         success: false,
                        //         error: err.message
                        //     })
                        // })
                    }
                    else{
                        return res.status(500).json({
                            success: false,
                            error: "Mobile number update failed!"
                        })
                    }
                    
                })
                .catch(err => {
                    // Error in updating user email
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        error: "This mobile number might be already in use."
                    })
                })
                

        }catch(err){
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    }else{
        return res.status(403).json({
            success: false,
            error: "enter valid mobile number"
        });
    }
}