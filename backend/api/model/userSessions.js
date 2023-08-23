const mongoose = require("mongoose");

const userSessionDetailSchema = new mongoose.Schema({
    sessionDetail :{
        // AllSessions._id reference
        type: ObjectId,
        ref: "AllSessions",
        required: true,
    },
    isSessionComplete: {
        // Check if the session is completed on not
        type: Boolean,
        default: false
    }
})

const userSessionsSchema = new mongoose.Schema({
    signupId: {
        // Stores the Profile._id field of the Profile whose session details are stored in this particular User Session
        type: ObjectId,
        ref: "Signup",
        required: true
    },
    averageSessionDuration: {
        // Average time user has spent on the website
        type: Number,
        default: 0
    },
    totalSessionDuration: {
        // Total Session time of the user
        type: Number,
        default: 0,
    },
    totalSignin: {
        // How many time user has signed in
        type: Number,
        default: 1
    },
    sessions: [userSessionDetailSchema]// Sessions stores data of a particular session of the user
});

module.exports = mongoose.model("UserSessions", userSessionsSchema);