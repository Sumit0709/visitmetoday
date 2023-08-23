const mongoose = require("mongoose");

const professionalUsedUrlSchema = new mongoose.Schema({
    url: {
        // Url currently in use
        type: String,
        required: true,
        unique: true,
        maxlength: 30 
    },
    professionalProfileId: {
        type: mongoose.Types.ObjectId,
        ref: "ProfessionalProfile",
        unique: false,
    },
    visitCounter: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("ProfessionalUsedUrl", professionalUsedUrlSchema);