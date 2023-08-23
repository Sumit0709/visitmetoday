const mongoose = require("mongoose");

const allSessionsSchema = mongoose.Schema({ // AllSessions._id will give the id for any particular session
    signupId: {
        // Stores the Profile._id field of the Profile whose session detail is stored in this particular session
        type: ObjectId,
        ref: "Signup",
        required: true
    },
    signinTime: {
        // Time at which signin was done
        type: Date,
        required: true
    },
    signoutTime:{
        // Time at which signout was done
        type: Date,
    },
    sessionDuration: {
        // Total duration of the session
        type: Number
    },
    ipAddress: {
        // Ip address of the user's machine which is used to signup
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
});

module.exports = mongoose.model("AllSessions", allSessionsSchema);