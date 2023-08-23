const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({ // Profile._id is automatically created and it gives the id of any particular profile
    signupId: {
        // Unique Id assigned for a user when he signup
        type: mongoose.Types.ObjectId,
        ref: "Signup",
        required: true,
        unique: true
    },
    firstName: {
        // First name of the user
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    middleName: {
        // Middle name of the user
        type: String,
        trim: true,
        default: "",
        maxlength: 20
    },
    lastName: {
        // last name of the user
        type: String,
        trim: true,
        default: "",
        maxlength: 20
    },
    photo:{
        // Photo of the user, stored as buffer data
        type: Buffer,
        required: true
    },
    gender: {
        // gender of the user
        type: Number,
        required: true
    },
    age: {
        // age
        type: Number,
        required: true
    },
    ageInsertedAt: {
        // Time at which user has inserted/updated the age 
        type: Date,
        required: true
    },
    country: {
        // Country in which user lives
        type: Number,
        required: true,
        default: 0
    },
    motto: {
        // Motto of the user
        type: String,
    },
    personality: {
        // Personality of the user
        type: String,
    },
    qrCodeUrl: {
        type: String,
    },
    sharingImage: {
        // Visiting card image generated for the profile
        type: Buffer,
    },
    profileVisitCount: {
        // count of number of time the user's profile is visited
        type: Number,
        default: 0
    },
    profileUrl: {// TODO::  String or Referencing, which to use?? => Referencing as it will help while updating it with custom url.
        // unique string that will be used to create unique profile url for a user
        type: mongoose.Types.ObjectId,
        ref: "UsedUrl",
        // unique: true, // making it usinque causes problem when creating document with it's default value, i.e. null, numtiple null is showing duplicate key error
    },

    // gitHub
    gitHub: {type: String},
    showGitHub: {type: Boolean, default: false},
    
    // quora
    quora: {type: String},
    showQuora: {type: Boolean, default: false},
    
    // spotify
    spotify: {type: String},
    showSpotify: {type: Boolean, default: false},
    
    // medium
    medium: {type: String},
    showMedium: {type: Boolean, default: false},
    
    // instagram
    instagram: {type: String},
    showInstagram: {type: Boolean, default: false},
    
    //snapchat
    snapchat: {type: String},
    showSnapchat: {type: Boolean, default: false},
    
    // discord
    discord: {type: String},
    showDiscord: {type: Boolean, default: false},
    
    // twitch
    twitch: {type: String},
    showTwitch: {type: Boolean, default: false},
    
    // vimeo
    vimeo: {type: String},
    showVimeo: {type: Boolean, default: false},
    
    // tinder
    tinder: {type: String},
    showTinder: {type: Boolean, default: false},

    // facebook profile of user
    facebook: {type: String},
    showFacebook: {type: Boolean, default: false},

    // LinkedIn profile of user
    linkedIn: {type: String},
    showLinkedIn: {type: Boolean, default: false},

    // Youtube profile of user
    youtube: {type: String},
    showYoutube: {type: Boolean, default: false},

    // Email id to be shown on profile
    profileEmail: {type: String},
    showProfileEmail: {type: Boolean, default: false},

    // Twitter profile of the user
    twitter: {type: String},
    showTwitter: {type: Boolean, default: false},

    // Telegram
    telegram: {type: String},
    showTelegram: {type: Boolean, default: false},
    
    // location
    location: {type: String},
    showLocation: {type: Boolean, default: false},
    
    //website
    website: {type: String},
    showWebsite: {type: Boolean, default: false},

    // Whatsapp number of the user
    whatsappCountryCode: {type: Number, defult: 0},
    whatsapp: {type: String},
    showWhatsapp: {type: Boolean, default: false},

    // Contact number to be shown on user profile
    contactNumberCountryCode: {type: Number, default: 0},
    contactNumber: {type: String},
    showContactNumber: {type: Boolean, default: false},

    // To ask user if whatsapp number and contact number are same
    isWhatsappAndContactNumberSame: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("Profile", profileSchema);