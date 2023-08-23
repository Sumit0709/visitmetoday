const { getUser, isSignedIn, isAuthenticated, getUserWithoutChecks } = require("../controller/auth/auth");
const { getPaymentDetails } = require("../controller/transaction/getPaymentDetails");
const { getPaymentQR } = require("../controller/transaction/getPaymentQR");

const express = require('express');
const { paymentDone } = require("../controller/transaction/paymentDone");
const router = express.Router();


router.get('/getPaymentDetails/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, getPaymentDetails)
router.get('/getPaymentQR/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, getPaymentQR)
router.post('/paymentDone/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, paymentDone)



module.exports = router