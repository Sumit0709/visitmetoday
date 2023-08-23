const mongoose = require("mongoose");

const usedUrlSchema = new mongoose.Schema({
    url: {
        // Url currently in use
        type: String,
        required: true,
        unique: true,
        maxlength: 30 
    },
    profileId: {
        // Profile Id of the profile which is using this url
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        unique: false,
    },
    // professionalProfileUrl: {
    //     type: String,
    //     unique: true,
    //     maxlength: 30
    // },
    // professionalProfileId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProfessionalProfile",
    //     unique: false,
    // },
    visitCounter: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("UsedUrl", usedUrlSchema);