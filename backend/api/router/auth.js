const express = require("express");
const { addToWaitingList } = require("../controller/auth/addToWaitingList");
const router = express.Router();

const {signup,signin, updateSignupEmail, updateSignupMobile, otpForForgetPassword, getUser, verifyOtp, updatePassword, isAdmin, isSignedIn, isAuthenticated, signout, isPlanValid} = require("../controller/auth/auth");
const { validateCaptcha } = require("../controller/auth/validateCaptcha");
const {verifyPassword} = require('../controller/auth/verifyPassword');
const { sendEmailForPaymentReceived } = require("../controller/common/sendEmailForPaymentReceived");


// ROUTES FOR TESTING SERVICES 
// Wiil have to reorder calling functions for proper functioning of the website
router.post("/signup",validateCaptcha, signup);
router.post("/signin",validateCaptcha, signin);
router.post("/addToWaitingList",validateCaptcha, addToWaitingList);

router.get('/isPlanValid/:sessionId', getUser, isPlanValid)

router.get("/signout",signout);

// HAVE TO REMOVE THESE TWO ROUTES
router.put("/updateSignupEmail/:sessionId",getUser,isSignedIn,isAuthenticated,verifyPassword,updateSignupEmail)
router.put("/updateSignupMobile/:sessionId",getUser,isSignedIn,isAuthenticated, verifyPassword, updateSignupMobile)

// router.get("/otpForForgetPassword/:sessionId",getUser,isSignedIn,isAuthenticated,otpForForgetPassword);
// router.post("/verifyOtp/:sessionId",getUser,isSignedIn,isAuthenticated,verifyOtp);

router.put('/update/password/:sessionId', getUser, isSignedIn, isAuthenticated, verifyPassword, updatePassword )

router.post("/isAdmin/:sessionId",getUser,isAdmin);
// router.post("/checkAuthentication/:sessionId",getUser,isSignedIn, isAuthenticated,(req, res) => {
//     console.log("ACCESS GRANTED");
//     return res.json({success: true, message: "Access granted"});
// });

// router.get('/sendEmailForPaymentReceived', sendEmailForPaymentReceived);

module.exports = router;