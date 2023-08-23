const express = require("express");
const { createCounter } = require("../controller/counter/createCounter");
const { geCounter} = require("../controller/counter/getCounter");
const { updateCounter } = require("../controller/counter/updateCounter");
const { getUser,isSignedIn,isAuthenticated, isAdmin } = require("../controller/auth/auth")

const router = express.Router();

router.post("/createCounter/:sessionId", getUser,isSignedIn,isAuthenticated,isAdmin,createCounter);
router.get("/getCounter", geCounter);
// router.get("/updateCounter", updateCounter);

module.exports = router