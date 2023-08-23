const Joi = require("joi");

const variable = require("../../../variable")
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

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
    // firstName: Joi.string().trim().alphanum().min(variable.minFirstNameLength).max(variable.maxFirstNameLength).required(),
    // middletName: Joi.string().trim().allow("").alphanum().min(variable.minMiddleNameLength).max(variable.maxMiddleNameLength),
    // lastName: Joi.string().trim().allow("").alphanum().min(variable.minLastNameLength).max(variable.maxLastNameLength),
    
    gender: Joi.number().integer().min(0).max(variable.endingGenderIndex).required(),
    age: Joi.number().integer().min(variable.minAge).max(variable.maxAge).required(),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex).required(),
    
    motto: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    personality: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
})

const basicProfessionalProfileScheme = Joi.object({
    
    sellOnline: Joi.number().integer().min(0).max(variable.endingGenderIndex).required(),
    since: Joi.number().integer().min(1000).max(currentYear).required(),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex).required(),
    
    dealsIn: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    servesInArea: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
})

const updateBasicProfileSchema = Joi.object({
    // firstName: Joi.string().trim().alphanum().min(variable.minFirstNameLength).max(variable.maxFirstNameLength),
    // middletName: Joi.string().trim().allow("").alphanum().min(variable.minMiddleNameLength).max(variable.maxMiddleNameLength),
    // lastName: Joi.string().trim().allow("").alphanum().min(variable.minLastNameLength).max(variable.maxLastNameLength),
    
    gender: Joi.number().integer().min(0).max(variable.endingGenderIndex),
    age: Joi.number().integer().min(variable.minAge).max(variable.maxAge),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex),
    
    motto: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    personality: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
})

const updateBasicProfessionalProfileScheme = Joi.object({
    
    sellOnline: Joi.number().integer().min(0).max(variable.endingGenderIndex),
    since: Joi.number().integer().min(1000).max(currentYear),
    country: Joi.number().integer().min(0).max(variable.maxCountryIndex),
    
    dealsIn: Joi.string().trim().allow("").min(variable.minMottoLength).max(variable.maxMottoLength),
    servesInArea: Joi.string().trim().allow("").min(variable.minPersonalityLength).max(variable.maxPersonalityLength),
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
    telegram: Joi.string().trim().allow(""),

    profileEmail : Joi.string().trim().allow("").lowercase().email(),
    whatsappCoutryCode: Joi.number().integer().allow(""),
    whatsApp: Joi.number().allow("",null).integer().min(4000000000).max(9999999999),
    contactNumberCountryCode: Joi.number().integer().allow(""),
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
    showTelegram: Joi.boolean().allow(""),

    showProfileEmail: Joi.boolean().allow(""),
    showWhatsapp: Joi.boolean().allow(""),
    showContactNumber: Joi.boolean().allow(""),
})

const customUrlSchema = Joi.object({
    customUrl: Joi.string().trim().regex(/^[_ a-zA-Z0-9]+$/).min(2).max(variable.maxCustomUrlLength).required()
})




exports.validateBasicProfile = validator(basicProfileScheme);
exports.validateBasicProfessionalProfile = validator(basicProfessionalProfileScheme);

exports.validateBasicProfileDuringUpdate = validator(updateBasicProfileSchema);
exports.validateBasicProfessionalProfileDuringUpdate = validator(updateBasicProfessionalProfileScheme);

exports.validateExtendedProfile = validator(extendedProfileSchema);
exports.validateCustomUrl = validator(customUrlSchema);


exports.isValidFirstName = (firstName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(firstName)){ return true}
    else { return false}
}

exports.isValidMiddleName = (middleName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(middleName) || middleName==''){ return true}
    else { return false}
}

exports.isValidLastName = (lastName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(lastName) || lastName==''){ return true}
    else { return false}
}

// Professional
exports.isValidCompanyFirstName = (firstName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(firstName)){ return true}
    else { return false}
}

exports.isValidCompanyMiddleName = (middleName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(middleName) || middleName==''){ return true}
    else { return false}
}

exports.isValidCompanyLastName = (lastName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(lastName) || lastName==''){ return true}
    else { return false}
}

exports.validateCustomUrl = (body) => {

    const customUrl = body.customUrl
    const re = /^[_ a-zA-Z0-9]{2,30}$/;

    if(re.test(customUrl)){
        for(let i=0; i<customUrl.length; i++){
            if(customUrl[i]==' '){
                return {
                    success: false
                }
            }
        }
        return {
            success: true
        }
    }
    else {return {
        success: false
    }}
}