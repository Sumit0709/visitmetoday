const bcrypt = require("bcrypt");
const { uuid } = require('uuidv4');

const Signup = require("../../model/signup")
const Verification = require("../../model/verification")
const {validateCreateUserAccount, validPassword} = require("../requestValidator/authValidator");

const variable = require("../../../variable");
const { superAdmin } = require("../ViewController");

const validateCaptcha = () => {
    // TODO::
    return true;
}

const createVerificationDocument = async (signupId) => {
    //::TODo ->  will have to think again

    const verification = new Verification({
        signupId: signupId,
        signupEmail: true,
        signupMobile: true
    });
    verification.save()
        .then(result => {
            if(result){
                console.log("createVerificationDocument successfull")
                Signup.findByIdAndUpdate(signupId, {verificationId: result._id})
                    .exec()
                    .then(updatedSignup => {
                        if(updatedSignup){
                            console.log("Signup updated successfully with verificationId")
                        }
                        else{
                            console.log("Signup updation with verificationId failed")
                        }
                    })
                    .catch(err => {
                        console.log("Signup updation with verificationId failed in catch")
                        console.log(err);
                    })
            }
            else{
                console.log("createVerificationDocument failed")
            }
        })
        .catch(err => {
            console.log("createVerificationDocument failed with catch");
            console.log(err)
        })
}

exports.superAdminCreateAccount = async (req,res) => {
    // Before calling this, call getUser() to add  superAdmins info into req.body.user

    // Controller for view
    const viewResult = superAdmin(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const ipAddress = req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();
    const email = req.body.email;

    // validating req.body
    const result = await validateCreateUserAccount(req.body);

    // validating password & password==confirmPassword
    const isValidPassword = validPassword(req.body.password) && (password==confirmPassword)

    if(result.success && isValidPassword){
        // ::TODO
        // we will later set the captcha validation status into req.body
        const isCaptchaValid = validateCaptcha();

        // check if user already exist

        const existingUser = await Signup.findOne({mobileNumber: req.body.mobileNumber}).exec();

        if(existingUser){
            return res.status(409).json({
                success: false,
                error: "User already exist",
            })
        }

        Signup.findOne({email: email})
            .exec()
            .then(user => {
                if(user){
                    return res.status(409).json({
                        success: false,
                        error: "User already exist",
                    })
                }else{
                    // user doesn't exist, so we can create new user
                    bcrypt.hash(password,variable.salt,(err,hash)=>{
                        if(err){
                            // something went wrong while hashing password
                            return res.status(500).json({
                                success: false,
                                error: err.message
                            })
                        }else{
                            // create signup document
                            const currTime = Date.now();
                            const validTill = currTime + 365*24*60*60*1000;

                            const signup = new Signup({
                                email: req.body.email,
                                mobileNumberCountryCode: req.body.mobileNumberCountryCode,
                                mobileNumber: req.body.mobileNumber,
                                password: hash,
                                captcha: isCaptchaValid,
                                ipAddress: ipAddress,
                                userAgent: userAgent,
                                isActive: true,
                                isTransactionValidated: true,
                                transactionValidTill: validTill,
                                sessionId: uuid()
                            });

                            // saving signup into database
                            signup.save().then(result => {
                                if(result && result != null){
                                    console.log("Signup Successful");
                                    // console.log(result);

                                    // crating document to store verification data of the user
                                    createVerificationDocument(result._id);

                                    // since user is created and successfully saved into the database, so we should pass success message
                                    return res.status(200).json({
                                        success: true,
                                        user: result,
                                        message: "User added to database"
                                    })
                                }
                                else{
                                    return res.status(500).json({
                                        success: false,
                                        error: 'Something went wrong while adding user to database'
                                    })
                                }
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    success: false,
                                    error: err.message
                                })
                            })
                        }
                    })
                }
            })
            .catch((err) => {
                console.log("User.findOne() failed")
                console.log(err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                })
            })
    }else{
        console.log("body validation failed");
        return res.status(403).json({
            // ...result,s
            success: false,
            error: "Invaid Input"
        });
    }
    
    
}