const express = require("express");
const { getFrontendData, getExtendedProfileList } = require("../../frontendData");
const router = express.Router();

router.get("/getFrontendData", getFrontendData);
router.get("/getExtendedProfileList", getExtendedProfileList);

module.exports = router;