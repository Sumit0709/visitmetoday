// const Joi = require("joi-browser");
import Joi from "joi-browser"
const variable = require("../../variable")

const validator = (schema) => async (values) => { 
    try{
        const result = await schema.validateAsync(values, {abortEarly:false, allowUnknown: true}); 
        return {success: true, result};
    }
    catch(error){
        return {success: false, error: error.details};
    }
}

const basicProfileScheme = Joi.object({
    firstName: Joi.string().trim().alphanum().min(variable.minFirstNameLength).max(variable.maxFirstNameLength).required(),
    middletName: Joi.string().trim().allow("").alphanum().min(variable.minMiddleNameLength).max(variable.maxMiddleNameLength),
    lastName: Joi.string().trim().allow("").alphanum().min(variable.minLastNameLength).max(variable.maxLastNameLength),
    
    gender: Joi.number().integer().min(0).max(variable.endingGenderIndex).required(),
    age: Joi.number().integer().min(variable.minAge).max(variable.maxAge).required(),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex).required(),
    
    motto: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    personality: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
})
const updateBasicProfileSchema = Joi.object({
    firstName: Joi.string().trim().alphanum().min(variable.minFirstNameLength).max(variable.maxFirstNameLength),
    middletName: Joi.string().trim().allow("").alphanum().min(variable.minMiddleNameLength).max(variable.maxMiddleNameLength),
    lastName: Joi.string().trim().allow("").alphanum().min(variable.minLastNameLength).max(variable.maxLastNameLength),
    
    gender: Joi.number().integer().min(0).max(variable.endingGenderIndex),
    age: Joi.number().integer().min(variable.minAge).max(variable.maxAge),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex),
    
    motto: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    personality: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
})

const extendedProfileSchema = Joi.object({
    
    linkedIn: Joi.string().trim().allow(""),
    twitter: Joi.string().trim().allow(""),
    youtube : Joi.string().trim().allow(""),
    
    gitHub : Joi.string().trim().allow(""),
    quora : Joi.string().trim().allow(""),
    spotify : Joi.string().trim().allow(""),
    medium : Joi.string().trim().allow(""),
    
    facebook: Joi.string().trim().allow(""),
    instagram : Joi.string().trim().allow(""),
    snapchat : Joi.string().trim().allow(""),
    discord : Joi.string().trim().allow(""),
    twitch : Joi.string().trim().allow(""),
    vimeo : Joi.string().trim().allow(""),
    tinder : Joi.string().trim().allow(""),
    
    profileEmail : Joi.string().trim().allow("").lowercase().email(),
    whatsApp: Joi.number().allow("",null).integer().min(4000000000).max(9999999999),
    contactNumber: Joi.number().allow("",null).integer().min(4000000000).max(9999999999),
    isWhatsappAndContactNumberSame: Joi.boolean().allow(""),



    showLinkedIn: Joi.boolean().allow(""),
    showTwitter: Joi.boolean().allow(""),
    showYoutube: Joi.boolean().allow(""),
    showGitHub: Joi.boolean().allow(""),
    showQuora: Joi.boolean().allow(""),
    showSpotify: Joi.boolean().allow(""),
    showMedium: Joi.boolean().allow(""),
    
    showFacebook: Joi.boolean().allow(""),
    showInstagram: Joi.boolean().allow(""),
    showSnapchat: Joi.boolean().allow(""),
    showDiscord: Joi.boolean().allow(""),
    showTwitch: Joi.boolean().allow(""),
    showVimeo: Joi.boolean().allow(""),
    showTinder: Joi.boolean().allow(""),
    
    showProfileEmail: Joi.boolean().allow(""),
    showWhatsapp: Joi.boolean().allow(""),
    showContactNumber: Joi.boolean().allow(""),
})

const customUrlSchema = Joi.object({
    customUrl: Joi.string().trim().alphanum().min(2).max(variable.maxCustomUrlLength).required()
})




exports.validateBasicProfile = validator(basicProfileScheme);
exports.validateBasicProfileDuringUpdate = validator(updateBasicProfileSchema);
exports.validateExtendedProfile = validator(extendedProfileSchema);
exports.validateCustomUrl = validator(customUrlSchema);
