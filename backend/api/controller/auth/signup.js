const bcrypt = require("bcrypt");
const { uuid } = require('uuidv4');

const Signup = require("../../model/signup")
const ReferalCode = require('../../model/referalCode')
const Verification = require("../../model/verification")
const {validateSignup, validPassword} = require("../requestValidator/authValidator");

const variable = require("../../../variable");
const { customAlphabet } = require('nanoid');
const Transactions = require("../../model/transactions");
const { sendEmailForWelcomeMessage } = require("../common/sendEmailForWelcomeMessage");


const alphabet = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ123456789';
const nanoid = customAlphabet(alphabet, variable.referalCodeLength);

const validateCaptcha = () => {
    // TODO::
    return true;
}

const createReferalDocument = async (signupId, referalCode, referedBy) => {

    const referalCodeDoc = new ReferalCode({
        signupId: signupId,
        referalCodeValue: referalCode,
        remainingReferals: variable.defaultReferals,
        referedBy: referedBy
    })

    referalCodeDoc.save()
        .then(result => {
            if(result){
                console.log("ReferalCode Document Created Successfully")
            }
            else{
                console.log("ReferalCode Document Creation Failed")
            }
        })
        .catch(err => {
            console.log("ReferalCode Document Creation Failed in catch")
            console.log(err);
        })
}

const updateGiversReferal = async (referalId, referalCode) => {
    
    ReferalCode.findByIdAndUpdate(referalId, {
        $inc: {
            remainingReferals: -1
        },
        $push: {
            referedTo: referalCode
        }
    }).exec()
    .then(result => {
        if(result){
            console.log("Referal givers referalDoc updated successfully")
        }
        else{
            console.log("Referal Giver's doc not found")
        }
    })
    .catch(err => {
        console.log("Referal givers Document update Failed in catch")
        console.log(err);
    })
}

const createVerificationDocument = async (signupId) => {
    //::TODo ->  will have to think again

    const verification = new Verification({
        signupId: signupId
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

const createTransactionDocument = async (signupId) => {

    const transactions = new Transactions({signupId: signupId});

    transactions.save()
        .then(result => {
            if(result){
                console.log('Transaction document for user created succcessfully')
            }else{
                console.log('Transaction document for user not created')
            }
        })
        .catch(err => {
            console.log('Transaction document for user not created - catch')
            console.log(err);
        })
}

exports.signup = async (req,res) => {

    // console.log(req.body);

    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();
    const email = req.body.email;

    // validating req.body
    const result = await validateSignup(req.body);

    // validating password & password==confirmPassword
    const isValidPassword = validPassword(req.body.password) && (password==confirmPassword)

    if(result.success && isValidPassword){
        // ::TODO
        // we will later set the captcha validation status into req.body
        const isCaptchaValid = validateCaptcha();

        // Check if user giving referal has enough referals left or not.
        // console.log(req.body);

        // check if role is present and if present is it valid or not
        if(req.body.role){
            if(req.body.role == process.env.USER_ROLE || 
                req.body.role == process.env.ADMIN_ROLE || 
                req.body.role == process.env.SUPER_ADMIN_ROLE  
                )
            {
                console.log("Valid Role")
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "Invalid request"
                });
            }
        }
        
        const referalGiver = await ReferalCode.findOne({referalCodeValue: req.body.referedBy},{
            
                remainingReferals: 1
            }).exec()

        if(!referalGiver){
            return res.status(401).json({
                success: false,
                error: "Invalid referal code"
            });
        }
        if(referalGiver.remainingReferals <= 0){
            return res.status(401).json({
                success: false,
                error: "Referal has been exhausted, use another referal"
            });
        }

        // check if user already exist -> NOT needed now as we are allowing multiple user to have same mobile number
        // let user = await Signup.findOne({mobileNumber: req.body.mobileNumber})
        // if(user){
        //     return res.status(409).json({
        //         success: false,
        //         error: "User already exist",
        //     })
        // }
        
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
                                error: "Something went wrong!"
                            })
                        }else{
                            // create signup document

                            // create referal code for the user
                            const referalCode = nanoid();
                            // console.log(referalCode);
                            const referedBy = req.body.referedBy;
                            const lowerCaseEmail = req.body.email.toLowerCase();


                            const currTime = Date.now();
                            let validTill = 0;
                            let isTransactionValidated = false;

                            if(req.body.isCreatedByAdmin == process.env.IS_CREATED_BY_ADMIN){  
                                validTill = currTime + 365*24*60*60*1000;
                                isTransactionValidated = true;
                            }

                            const signup = new Signup({
                                email: lowerCaseEmail,
                                mobileNumberCountryCode: req.body.mobileNumberCountryCode,
                                mobileNumber: req.body.mobileNumber,
                                password: hash,
                                role: req.body.role? req.body.role: 0,
                                captcha: isCaptchaValid,
                                ipAddress: ipAddress,
                                userAgent: userAgent,
                                isActive: true,
                                referalCode: referalCode,
                                isTransactionValidated: true,
                                transactionValidTill: validTill,
                                sessionId: uuid()
                            });


                            // To Remove the unique feature set on mobile before
                            // Signup.collection.dropIndex('mobileNumber_1',(err, result) => {
                            //     console.log("ERR = ");
                            //     console.log(err);

                            //     console.log("RESULT = ");
                            //     console.log(result);
                            // })

                            // saving signup into database
                            signup.save().then(result => {
                                if(result && result != null){
                                    console.log("Signup Successful");
                                    // console.log(result);

                                    // crating document to store verification data of the user
                                    
                                    createVerificationDocument(result._id);
                                    createReferalDocument(result._id, referalCode, referedBy)
                                    updateGiversReferal(referalGiver._id, referalCode)
                                    // since user is created and successfully saved into the database, so we should pass success message
                                    
                                    sendEmailForWelcomeMessage({
                                        to_name: 'User',
                                        to_email: req.body.email,
                                        sender_name: process.env.SENDER_NAME,
                                        sender_email: process.env.SENDER_EMAIL,
                                    })

                                    return res.status(200).json({
                                        success: true,
                                        // user: result,
                                        message: "User added to database"
                                    })
                                }
                                else{
                                    return res.status(500).json({
                                        success: false,
                                        error: "Registration failed!"
                                    })
                                }
                            })
                            .catch(err => {
                                // console.log(err)
                                return res.status(500).json({
                                    success: false,
                                    error: "Something went wrong!"
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
        console.log(result)
        return res.status(403).json({
            // ...result,s
            success: false,
            error: "Invaid Input",
            // result: result
        });
    }
    
    
}