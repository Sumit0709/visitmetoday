const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const Signup = require("../../model/signup")
const Signin = require('../../model/signin')
const {validateSignin, validPassword} = require("../requestValidator/authValidator");

const variable = require("../../../variable")


exports.signin = async (req, res) => {

    const ipAddress = req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const password = req.body.password.trim();
    // validating req.body
    const result = await validateSignin(req.body);

    // validating password
    const isValidPassword = validPassword(req.body.password)
    if(result.success && isValidPassword){
        
        try{

            let user;

            // let isNumber = true;
            // const num = ['1','2','3','4','5','6','7','8','9','0']
            const emailOrMobile = req.body.emailOrMobile;
            // for(i in emailOrMobile){
            //     const char = emailOrMobile[i];
            //     if(!num.includes(char)){
            //         isNumber = false;
            //         break;
            //     }
            // }

            // if(isNumber == false){
            user = await Signup.findOne({email: emailOrMobile.toLowerCase()}).exec()
            // }
            // else{
            //     user = await Signup.findOne({mobileNumber: emailOrMobile}).exec();
            // }
            
            if(!user){
                return res.status(401).json({
                    success: false,
                    error: "Account doesnot exist"
                })
            }
            else if(user && user.isActive == false){
                // user has deleted their account
                return res.status(409).json({
                    success: false,
                    error: "Account is not active, Please contact Admin."
                })
            }

            else if(user.isActive == false){
                // user has deleted their account
                return res.status(409).json({
                    success: false,
                    error: "Account is not active, Please contact Admin."
                })
            }

            // const user = req.body.user;
            // comparing passwords
            bcrypt.compare(password, user.password, (err, match)=> {
                if(err){
                    res.status(401).json({
                        success: false,
                        error: err.message
                    })
                }
                if(match){
                    // password matched

                    // VERIFICATION OF EMAIL AND MOBILE

                    // if(!user.isEmailVerified && !user.isMobileNumberVerified){
                    //     return res.status(450).json({
                    //         success: false,
                    //         error: "Please verify your email id and mobile number",
                    //         redirectToVerify: 3,
                    //         email: user.email,
                    //         mobileNumber: user.mobileNumber
                    //     })
                    // }

                    // if(!user.isEmailVerified){
                    //     return res.status(450).json({
                    //         success: false,
                    //         error: "Please verify your email Id",
                    //         redirectToVerify: 1,
                    //         email: user.email
                    //     })
                    // }
                    // else if(!user.isMobileNumberVerified){
                    //     return res.status(450).json({
                    //         success: false,
                    //         error: "Please verify your Mobile number",
                    //         redirectToVerify: 2,
                    //         mobileNumber: user.mobileNumber
                    //     })
                    // }

                    // generating jsonwebtoken to be passed to the user for authentication in future
                    const token = jwt.sign({
                        email: user.email,
                        _id: user._id,
                        createdAt: user.createdAt
                    },process.env.SECRET,{
                        expiresIn: "999d"
                    });
                    
                    // token to be stored in users cookies
                    // res.cookie("visitme_today_token",token,{expires: new Date(Date.now() +60*1000), httpOnly: false});
                    // res.cookie("sessionId",user.sessionId)


                    // Create Signin document
                    // ::TODO -> When to insert signout?
                    const signin = new Signin({
                        signupId: user._id,
                        isSigninSuccessful: true,
                        ipAddress: ipAddress,
                        userAgent: userAgent,
                        isActive: true
                    });

                    // saving signin document
                    signin.save().then(result => {
                        
                        if(result && result!=null){
                            // login successfull
                            return res.status(200).json({
                                success: true,
                                sessionId: user.sessionId,
                                token,
                                role: user.role,
                                email: user.email,
                                isProfile: user.profileId? true: false,
                                message: "Successfully signed in"
                            })
                        }else{
                            // problem in creating the signin document
                            return res.status(500).json({
                                success: false,
                                // error: err,
                                message: "Something went wrong, please retry"
                            })
                        }
                        
                    }).catch(err => {
                        return res.status(500).json({
                            success: false,
                            // error: err,
                            error: "Something went wrong, please retry"
                        })
                    })
                }
                else{
                    return res.status(401).json({
                        success: false,
                        error: "Incorrect Password"
                    })
                }
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }

    }else{
        console.log(result)
        return res.status(403).json({
            success: false,
            error: "invalid input"
        });
    }
}