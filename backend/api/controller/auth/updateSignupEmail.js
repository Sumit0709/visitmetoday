const Signup = require("../../model/signup")
const Verification = require("../../model/verification")
const {validateUpdateSignupEmail} = require("../requestValidator/authValidator");

const {allUser} = require("../ViewController")

exports.updateSignupEmail = async (req, res) => {

    const result = await validateUpdateSignupEmail(req.body);

    if(result.success){
        try{
            const user = req.body.user;
            // Controller for view
            const viewResult = allUser(req,res);
            if(viewResult.success == false){
                return res.status(401).json(viewResult);
            }

            // find user by id and update it's email
            Signup.findByIdAndUpdate(user._id,{email: req.body.newEmail.toLowerCase(), isEmailVerified: false},{new: true})
                .exec()
                .then(newUser => {

                    if(newUser){
                        //TODO:: SEND EMAIL UPDATED SUCCESSFULLY  EMAIL 

                        res.status(200).json({
                            success: true,
                            message: "Email has been successfully updated"
                        }) 

                    // reset verification of email to be false
                    // if verifcation document corresponding to this user doesnot exist, it will be created (upsert = true)
                    Verification.findOneAndUpdate({signupId: user._id}, {signupEmail: false}, {upsert: true, new:true})
                    
                    return res;
                        // In any case we will return success message, as update is successfull, do we hav to execute commented code??

                        // .exec()
                        // .then(result => {
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
                        // email updation into database failed
                        return res.status(500).json({
                            success: false,
                            error: "Email update failed!"
                        })
                    }
                        
                })
                .catch(err => {
                    // Error in updating user email
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        error: "This email might be already in use."
                    })
                })
            

        }catch(err){
            return res.status(500).json({
                success: false,
                error: 'something went wrong'
            })
        }
    }else{
        return res.status(403).json({
            success: false,
            error: "enter valid email"
        });
    }
}