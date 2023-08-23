const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({

    signupId: {
        // Stores the Profile._id of the profile whose verification detail is stored in this particular document
        type: mongoose.Types.ObjectId,
        ref: "Signup",
        required: true
    },
    firstName: {
        // is first name verified
        type: Boolean,
        default: false
    },
    photo: {
        // is photo verified
        type: Boolean,
        default: false
    },
    gender: {
        // is gender of user verified
        type: Boolean,
        default: false 
    },
    age: {
        // is age of user verified
        type: Boolean,
        default: false
    },
    country: {
        // is country of residance verified
        type: Boolean,
        default: false
    },
    motto: {
        // is motto of user verified 
        type: Boolean,
        default: false
    },
    personality: {
        // is personality of user verified
        type: Boolean,
        default: false
    },


    // // is facebook verified
    // facebook: {type: Boolean, default: false},

    // // is linkedIn verified
    // linkedIn: {type: Boolean, default: false},

    // // is youtube verified
    // youtube: {type: Boolean, default: false},

    // // is profile email verified
    // profileEmail: {type: Boolean, default: false},

    // // is twitter verified
    // twitter: {type: Boolean, default: false},

    // // is whatsapp verified
    // whatsapp: {type: Boolean, default: false},

    // // is contact number verified
    // contactNumber: {type: Boolean, default: false},

    // // is signup email verified
    // signupEmail: {type: Boolean, default: false},

    // // is signup mobile number verified
    // signupMobile: {type: Boolean, default: false}






    // gitHub
    gitHub: {type: Boolean, default: false},
    
    // quora
    quora: {type: Boolean, default: false},
    
    // spotify
    spotify: {type: Boolean, default: false},
    
    // medium
    medium: {type: Boolean, default: false},
    
    // instagram
    instagram: {type: Boolean, default: false},
    
    //snapchat
    snapchat: {type: Boolean, default: false},
    
    // discord
    discord: {type: Boolean, default: false},
    
    // twitch
    twitch: {type: Boolean, default: false},
    
    // vimeo
    vimeo: {type: Boolean, default: false},
    
    // tinder
    tinder: {type: Boolean, default: false},

    // facebook profile of user
    facebook: {type: Boolean, default: false},

    // LinkedIn profile of user
    linkedIn: {type: Boolean, default: false},

    // Youtube profile of user
    youtube: {type: Boolean, default: false},

    // Email id to be shown on profile
    profileEmail: {type: Boolean, default: false},

    // Twitter profile of the user
    twitter: {type: Boolean, default: false},

    // Telegram
    telegram: {type: Boolean, default: false},
    
    // location
    location: {type: Boolean, default: false},
    
    //website
    website: {type: Boolean, default: false},

    // Whatsapp number of the user
    whatsapp: {type: Boolean, default: false},

    // Contact number to be shown on user profile
    contactNumber: {type: Boolean, default: false},


});

module.exports = mongoose.model("Verification", verificationSchema);