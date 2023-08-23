const mongoose = require("mongoose");

const availableUrlSchema = new mongoose.Schema({
    url: {
        // url available to be used
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("AvailableUrl", availableUrlSchema);