const express = require("express");
const router = express.Router();

const {getUser, isSignedIn, isAuthenticated, isAdmin, getUserWithoutChecks} = require("../controller/auth/auth");

const {superAdminCreateAccount} = require("../controller/admin/superAdminCreateAccount");
const { superAdminUpdatePassword } = require("../controller/admin/superAdminUpdatePassword");
const { getAllUsers } = require("../controller/admin/getAllUser");
const { updateActiveStatus } = require("../controller/admin/updateActiveStatus");
const { getVerificationDetails } = require("../controller/admin/getVerificationDetails");
const { createFirstReferalCode } = require("../controller/common/createFirstReferalCode");
const { updatePaymentDetails } = require("../controller/admin/transactions/updatePaymentDetails");
const { getPendingTransactionList } = require("../controller/admin/transactions/getPendingTransactionList");
const { validateTransaction } = require("../controller/admin/transactions/validateTransaction");
const { signup } = require("../controller/auth/signup");
const { getAllDetailsOfAUser } = require("../controller/admin/getAllDetailsOfAUser");
const { deleteUser } = require("../controller/admin/deleteUser");
const { getDetailsToUpdate } = require("../controller/admin/updateUser/getDetailsToUpdate");
const { updateBasicProfile } = require("../controller/admin/updateUser/updateBasicProfile");
const { updateExtendedProfile } = require("../controller/admin/updateUser/updateExtendedProfile");
const { mobileNumberCountryCodeMiddleware } = require("../controller/common/mobileNumberCountryCodeMiddleware");
const { countriesListMiddleware } = require("../controller/common/countriesListMiddleware");
const { updateVerification } = require("../controller/admin/updateVerification");
const { getReferedToList } = require("../controller/admin/getReferedToList");


// ROUTES FOR TESTING SERVICES
// Wiil have to reorder calling functions for proper functioning of the website
router.post("/superAdmin/createAccountForUser/:sessionId",getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, signup);
router.put("/superAdmin/updatePassword/:sessionId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, superAdminUpdatePassword)

// USER
router.get("/admin/getAllUsers/:sessionId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, getAllUsers)
router.put("/admin/updateActiveStatus/:sessionId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, updateActiveStatus)
router.get("/admin/getVerificationDetails/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, getVerificationDetails)
router.get("/admin/getAllDetailsOfAUser/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, mobileNumberCountryCodeMiddleware, countriesListMiddleware, getAllDetailsOfAUser)
router.delete("/admin/deleteUser/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, deleteUser)
router.get("/admin/getUserDetailsToUpdate/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, mobileNumberCountryCodeMiddleware, countriesListMiddleware, getDetailsToUpdate)
router.post("/admin/getReferedToList/:sessionId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, getReferedToList)


router.put("/admin/updateBasicProfile/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, updateBasicProfile)
router.put("/admin/updateExtendedProfile/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, updateExtendedProfile)
router.put("/admin/updateVerification/:sessionId/:userId", getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, updateVerification)

// NO longer Needed
router.post("/createFirstReferal", createFirstReferalCode);
//

router.put('/admin/updatePaymentDetails/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, updatePaymentDetails);

// transactions
router.get('/admin/getPendingTransactions/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, getPendingTransactionList)
router.post('/admin/validateTransaction/:sessionId', getUserWithoutChecks, isSignedIn, isAuthenticated, isAdmin, validateTransaction)


module.exports = router;