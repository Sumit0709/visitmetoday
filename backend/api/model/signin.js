const mongoose = require("mongoose");

const signinSchema = new mongoose.Schema({

    signupId: {
        // Profile that is accessed after successful signin
        type: mongoose.Types.ObjectId,
        ref: "Signup",
        required: true
    },
    isSigninSuccessful: {
        // Is the Signin Successful
        type: Boolean,
        required: true
    },
    ipAddress: {
        // IP address of user's machine which is used to signin
        type: String,
        required: true,
        trim: true
    },
    userAgent: {
        // Information regarding browser and machine
        type: Object,
        required: true,
        trim: true,
    },
    isActive: {
        // Is account active or deactivated
        type: Boolean,
        required: true
    },

},{
    timestamps:{createdAt: "signinTime"}
});
// timestamp stored Signin time of the user 

module.exports = mongoose.model("Signin", signinSchema);