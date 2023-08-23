const express = require("express");
const router = express.Router();

const { getUserByEmail } = require("../controller/common/getUserByEmail");
const { getUserByEmailOrMobile } = require("../controller/common/getUserByEmailOrMobile");
const { getUserByMobileNumber } = require("../controller/common/getUserByMobileNumber");
const { generateOtp } = require("../controller/otp/generateOtp");
const { verifyOtp } = require("../controller/otp/verifyOtp");

const {updateIsEmailVerified} = require('../controller/otp/updateIsEmailVerified')
const {updateIsMobileVerified} = require('../controller/otp/updateIsMobileVerified');
const { updatePassword } = require("../controller/auth/updatePassword");
const { generateOtpForForgotPassword } = require("../controller/otp/generateOtpForForgotPassword");

router.post('/verifyEmail/generateOtp/', getUserByEmail, generateOtp)
router.post('/verifyMobileNumber/generateOtp/', getUserByMobileNumber, generateOtp)
router.post('/forgotPassword/generateOtp/', getUserByEmail, generateOtpForForgotPassword)

router.post('/verifyEmail/verifyOtp/', getUserByEmail, verifyOtp, updateIsEmailVerified)
router.post('/verifyMobileNumber/verifyOtp/', getUserByMobileNumber, verifyOtp, updateIsMobileVerified)
router.post('/forgotPassword/verifyOtp/', getUserByEmail, verifyOtp, updatePassword)


module.exports = router;