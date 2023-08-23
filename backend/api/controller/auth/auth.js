const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
const {expressjwt: jwt} = require("express-jwt");

const Signup = require("../../model/signup")
const Signin = require('../../model/signin')
const Verification = require("../../model/verification")
const {validateGetUser} = require("../requestValidator/authValidator");
const { signup } = require("./signup");
const { signin } = require("./signin");
const { updateSignupEmail } = require("./updateSignupEmail");
const { updateSignupMobile } = require("./updateSignupMobile");
const { otpForForgetPassword } = require("./otpForForgetPassword");
const { verifyOtp } = require("./verifyOtp");
const { updatePassword } = require("./updatePassword");

const variable = require('../../../variable');
const { signout } = require("./signout");

const salt = variable.salt;


// checking if we have ipAddress and userAgent in our request
const isValidReqHandler = (req) => {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    // console.log(ipAddress, userAgent);

    if(!ipAddress || !userAgent){
        return false
    }
    return true;
}


// getting user to be user for further operations.
// MIDDLEWARE
exports.getUser = async (req, res, next) => {
    
    // checking if values in req.body are valid or not to perform this operation (i.e. it should have either valid email or valid mobileNumber => emalOrMobile) 
    // const result = await validateGetUser(req.body);
    const sessionId = req.params.sessionId;
    // console.log(sessionId);
    // if(!result.success){
    //     return res.status(403).json({
    //         ...result,  
    //         message: "Invaid Input"
    //     });
    // }

    // value of field to be searched in our Signup database
    // const searchVal = req.body.emailOrMobile;
    // is isNum == true, that means the entered value is mobileNumber, so we will search against mobileNumber in our Database
    // ::TODO -> update this check 
    // const isNum = (typeof searchVal) === "number"
    // console.log("isNumber: " + isNum);
    try{
        // var user;
        // if(isNum){
        //     // search for user details against mobileNumber
        //     user = await Signup.findOne({mobileNumber: searchVal});
        // }else{
        //     // search for user details against email
        //     user = await Signup.findOne({email: searchVal});
        // }

        const user = await Signup.findOne({sessionId: sessionId}).exec();
        const currTime = Date.now();
        // findById(userId).exec();

        // console.log(user.transactionValidTill)
        // console.log(currTime)
        
        if(!user || user == null){
            return res.status(409).json({
                success: false,
                error: "User doesnot exist",
            })
        }
        else if(user.isActive == false){
            // user has deleted their account
            return res.status(409).json({
                success: false,
                error: "Account is not active, Please contact Admin."
            })
        }
        // TO CHECK IF USER HAS MADE PAYMENT AND IT'S VALID TILL NOW
        
        // else if(user.transactionValidTill < currTime){
        //     return res.status(401).json({
        //         success: false,
        //         error:'PLAN_EXPIRED'
        //     })
        // }
        else{
            // user has been successfully found and is attached into the req.body as req.body.user
            req.body.user = user;
            next();
        }
    }
    catch(err) {
        // something went wrong while doing above operation
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}


exports.getUserWithoutChecks = async (req, res, next) => {
    
    
    const sessionId = req.params.sessionId;
    
    try{

        const user = await Signup.findOne({sessionId: sessionId}).exec();
        const currTime = Date.now();
        // findById(userId).exec();

        
        if(!user || user == null){
            return res.status(409).json({
                success: false,
                error: "User doesnot exist",
            })
        }
        // else if(user.isActive == false){
        //     // user has deleted their account
        //     return res.status(409).json({
        //         success: false,
        //         error: "Account is not active, Please contact Admin."
        //     })
        // }
        else{
            // user has been successfully found and is attached into the req.body as req.body.user
            req.body.user = user;
            next();
        }
    }
    catch(err) {
        // something went wrong while doing above operation
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}

exports.isPlanValid = async (req, res) => {
    
    const user = req.body.user;
    const currTime = Date.now();

    if(user.transactionValidTill < currTime){
        return res.status(401).json({
            success: false,
            error:'PLAN_EXPIRED'
        })
    }
    else{
        return res.status(200).json({
            success: true,
            message: 'Current Plan is Valid'
        })
    }
}

// check if the requesting party is admin or not
// MIDDLEWARE
exports.isAdmin = (req, res, next) => {
    if(req.body.user.role == process.env.ADMIN_ROLE || req.body.user.role == process.env.SUPER_ADMIN_ROLE){
        // User is admin, grant access to proceed further
        next();
    }
    else{
        // user is not admin, return from here
        return res.status(403).json({
            success: false,
            error: "Access denied" 
        });
    }
}

exports.isSuperAdmin = (req, res, next) => {
    if(req.body.user.role == process.env.SUPER_ADMIN_ROLE){
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            error: "Access Denied"
        })
    }
}

// we are destructuring our token to use for further processing
// MIDDLEWARE
exports.isSignedIn = jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});


// checking is the user is same as he claims to be
// MIDDLEWARE
exports.isAuthenticated = async (req, res, next) => {
    
    // console.log("COOKIE")
    // console.log(req.cookies)

    const isValid = req.body.user && req.auth && req.body.user._id==req.auth._id;
    if(isValid){
        next();
    }
    else{
        console.log("ERROR AUTHENTICATION");
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
}









// FURTHER ROUTES

exports.signup = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return signup(req, res);
}

exports.signin = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return signin(req, res);
}

exports.signout = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return signout(req, res);
}

exports.updateSignupEmail = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return updateSignupEmail(req, res);
}


exports.updateSignupMobile = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return updateSignupMobile(req,res);
}


exports.otpForForgetPassword = async(req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return otpForForgetPassword(req, res);
}

exports.verifyOtp = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return verifyOtp(req, res);
}
exports.updatePassword = async (req, res) => {
    const isValidReq = isValidReqHandler(req);
    if(!isValidReq){
        return res.status(400).json({
            success: false,
            error: "bad request"
        })
    }

    return updatePassword(req, res);
}