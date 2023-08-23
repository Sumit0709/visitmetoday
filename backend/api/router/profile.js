const express = require("express");
const router = express.Router();

const { createProfile } = require("../controller/profile/profile");
const { getUser, isSignedIn, isAuthenticated, isAdmin, getUserWithoutChecks } = require("../controller/auth/auth");
const { generateAvailableUrl } = require("../controller/generateAvailableUrl");
const { updateExtendedProfile } = require("../controller/profile/updateExtendedProfile");
const { updateBasicProfile } = require("../controller/profile/updateBasicProfile");
const { updateProfilePhoto } = require("../controller/profile/updateProfilePhoto");
const {getProfileIdFromUrl} = require("../controller/profile/getProfileIdFromUrl");
const { getProfile } = require("../controller/profile/getProfile");
const { generateQrCode } = require("../controller/card/generateQrCode");
const { getProfilePhoto } = require("../controller/profile/getProfilePhoto");
const { GenerateSharingImage } = require("../controller/card/GenerateSharingImage");
const { generateSharingImageMiddleware } = require("../controller/card/GenerateSharingImageMiddleware");
const { customProfileUrl } = require("../controller/profile/customProfileUrl");
const { getCard } = require("../controller/profile/getCard");
const { getPublicProfile } = require("../controller/profile/getPublicProfile");
const { getProfileUrl } = require("../controller/profile/getProfileUrl");
const { getProfileIdFromUrlAndIncVisitCounter } = require("../controller/profile/getProfileIdFromUrlAndIncVisitCounter");
const { updateProfileUrl } = require("../controller/profile/updateProfileUrl");
const { getReferalAndVisitCounter } = require("../controller/profile/getReferalAndVisitCounter");
const { createProfessionalProfile } = require("../controller/profile/professional/createProfessionalProfile");
const { getProfessionalProfile } = require("../controller/profile/professional/getProfessionalProfile");
const { doesProfessionalProfileExist } = require("../controller/profile/professional/doesProfessionalProfileExist");
const { getProfessionalProfileUrl } = require("../controller/profile/professional/getProfessionalProfileUrl");
const { getProfessionalProfilePhoto } = require("../controller/profile/professional/getProfessionalProfilePhoto");
const { generateProfessionalSharingImageMiddleware } = require("../controller/card/professional/GenerateProfessionalSharingImageMiddleware");
const { generateProfessionalQrCode } = require("../controller/card/professional/generateProfessionalQrCode");
const { getProfessionalProfileIdFromUrl } = require("../controller/profile/professional/getProfessionalProfileIdFromUrl");
const { getProfessionalProfileIdFromUrlAndIncVisitCounter } = require("../controller/profile/professional/getProfessionalProfileIdFromUrlAndIncVisitCounter");
const { getProfessionalPublicProfile } = require("../controller/profile/professional/getProfessionalPublicProfile");
const { GenerateProfessionalSharingImage } = require("../controller/card/professional/GenerateProfessionalSharingImage");
const { getProfessionalCard } = require("../controller/profile/professional/getProfessionalCard");
const { getProfessionalReferalAndVisitCounter } = require("../controller/profile/professional/getProfessionalReferalAndVisitCounter");
const { updateBasicProfessionalProfile } = require("../controller/profile/professional/updateBasicProfessionalProfile");
const { updateExtendedProfessionalProfile } = require("../controller/profile/professional/updateExtendedProfessionalProfile");
const { customProfessionalProfileUrl } = require("../controller/profile/professional/CustomProfessionalProfileUrl");
const { updateProfessionalProfilePhoto } = require("../controller/profile/professional/updateProfessionalProfilePhoto");
const { getViewAnalysis } = require("../controller/profile/getViewAnalysis");

// To add Url into available list
// router.post("/generateUrl/:sessionId",getUser,isSignedIn,isAuthenticated,isAdmin,generateAvailableUrl);

router.get("/doesProfessionalProfileExist/:sessionId", getUser, isSignedIn, isAuthenticated, doesProfessionalProfileExist);

router.post("/createProfile/:sessionId",getUser,isSignedIn,isAuthenticated,createProfile);
router.post("/createProfessionalProfile/:sessionId",getUser,isSignedIn,isAuthenticated,createProfessionalProfile);

router.put("/updateBasicProfile/:sessionId",getUser,isSignedIn,isAuthenticated,updateBasicProfile, generateSharingImageMiddleware, GenerateSharingImage)
router.put("/updateBasicProfessionalProfile/:sessionId",getUser,isSignedIn,isAuthenticated,updateBasicProfessionalProfile, generateProfessionalSharingImageMiddleware, GenerateProfessionalSharingImage)

router.put("/updateExtendedProfile/:sessionId",getUser,isSignedIn,isAuthenticated, updateExtendedProfile)
router.put("/updateExtendedProfessionalProfile/:sessionId",getUser,isSignedIn,isAuthenticated, updateExtendedProfessionalProfile)

router.put("/updateProfilePhoto/:sessionId",getUser,isSignedIn,isAuthenticated, updateProfilePhoto, generateSharingImageMiddleware, GenerateSharingImage)
router.put("/updateProfessionalProfilePhoto/:sessionId",getUser,isSignedIn,isAuthenticated, updateProfessionalProfilePhoto, generateProfessionalSharingImageMiddleware, GenerateProfessionalSharingImage)

router.put("/updateCustomProfileUrl/:sessionId", getUser, isSignedIn,isAuthenticated, customProfileUrl, generateSharingImageMiddleware, GenerateSharingImage)
router.put("/updateCustomProfessionalProfileUrl/:sessionId", getUser, isSignedIn,isAuthenticated, customProfessionalProfileUrl, generateProfessionalSharingImageMiddleware, GenerateProfessionalSharingImage)

router.get("/getProfileFromUrl/:profileUrl",getProfileIdFromUrlAndIncVisitCounter, getPublicProfile)
router.get("/getProfessionalProfileFromUrl/:profileUrl",getProfessionalProfileIdFromUrlAndIncVisitCounter, getProfessionalPublicProfile)

router.get("/getProfile/:sessionId", getUser,isSignedIn,isAuthenticated,getProfile)
router.get("/getProfessionalProfile/:sessionId", getUser,isSignedIn,isAuthenticated,getProfessionalProfile)

// request made from frontend
router.get("/getProfilePhotoFromUrl/:profileUrl",getProfileIdFromUrl,getProfilePhoto)
router.get("/getProfilePhotoFromUrl/b/:professionalProfileUrl",getProfessionalProfileIdFromUrl,getProfessionalProfilePhoto)

router.get("/getProfilePhoto/:sessionId",getUser, getProfilePhoto);
router.get("/getProfilePhoto/b/:sessionId",getUser, getProfessionalProfilePhoto);

// called from canvas to load profile photo
router.get("/getProfilePhotoForCard/:sessionId",getUser,getProfilePhoto)
router.get("/getProfilePhotoForCard/b/:sessionId",getUser,getProfessionalProfilePhoto)

// router.post("/generateQrCode/:sessionId",getUser,isSignedIn,isAuthenticated,generateQrCode)

 
router.put("/updateCard/:sessionId",getUser,isSignedIn,isAuthenticated, generateSharingImageMiddleware,GenerateSharingImage)

router.get("/getCard/:profileUrl", getProfileIdFromUrl, getCard)
router.get("/getProfessionalCard/:professionalProfileUrl", getProfessionalProfileIdFromUrl, getProfessionalCard)

router.get("/getCard/session/:sessionId", getUser, getCard)
router.get("/getCard/session/b/:sessionId", getUser, getProfessionalCard)

router.post("/createCard/:sessionId",getUser,isSignedIn,isAuthenticated, generateSharingImageMiddleware,generateQrCode,GenerateSharingImage)
router.post("/createProfessionalCard/:sessionId",getUser,isSignedIn,isAuthenticated, generateProfessionalSharingImageMiddleware,generateProfessionalQrCode,GenerateProfessionalSharingImage)

router.get("/getReferalAndVisitCounter/:sessionId", getUser, isSignedIn, isAuthenticated, getReferalAndVisitCounter);
router.get("/getProfessionalReferalAndVisitCounter/:sessionId", getUser, isSignedIn, isAuthenticated, getProfessionalReferalAndVisitCounter);

router.get("/getProfileUrl/:sessionId", getUserWithoutChecks, getProfileUrl)
router.get("/getProfessionalProfileUrl/:sessionId", getUserWithoutChecks, getProfessionalProfileUrl)

router.get("/getViewAnalysis/:sessionId", getUser, getViewAnalysis)

module.exports = router;