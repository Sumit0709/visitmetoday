const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ // Counter._id will give id for any particular counter
    // Total number of signup done on our website
    signup: {type: Number, default:0},

    // Total number of signin done on our website
    signin: {type: Number, default: 0},

    // Total number of profile created on our website
    profileCreated: {type: Number, default: 0},

    // Total number of profile visited on our website
    profileVisited: {type: Number, default: 0},

    // Total number of extended profiled added on our website
    extendedProfiles: {type: Number, default: 0},

    // Total active time on our website
    totalActiveTime: {type: Number, default: 0},

    // Average active time on our website
    averageActiveTime: {type: Number, default: 0},
});

module.exports = mongoose.model("Counter", counterSchema);