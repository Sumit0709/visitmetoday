const Joi = require('joi');
const variable = require('../../../variable');

// common function to call for validation of each schema
const validator = (schema) => async (values) => { 
    try{
        const result = await schema.validateAsync(values, {abortEarly:false, allowUnknown: true}); 
        return {success: true, result};
    }
    catch(error){
        return {success: false, error: error.details};
    }
}

// SIGNUP
const signupSchema = Joi.object({
    
    email: Joi.string().trim().lowercase().email().required(),
    mobileNumberCountryCode: Joi.number().integer().required(),
    mobileNumber: Joi.number().integer().min(4000000000).max(9999999999).required(),
    referedBy: Joi.string().trim().alphanum().length(variable.referalCodeLength).required()
});

const createUserAccountSchema = Joi.object({
    
    email: Joi.string().trim().lowercase().email().required(),
    mobileNumberCountryCode: Joi.number().integer().required(),
    mobileNumber: Joi.number().integer().min(4000000000).max(9999999999).required()
});

const addToWaitingListSchema = Joi.object({
    
    email: Joi.string().trim().lowercase().email().required(),
    mobileNumberCountryCode: Joi.number().integer().required(),
    mobileNumber: Joi.number().integer().min(4000000000).max(9999999999).required(),
    name: Joi.string().trim().max(30).required()
});

// SIGNIN
const signinSchema = Joi.object({
    emailOrMobile: Joi.alternatives()
    .try(
        // Either valid email or valid phone number
       Joi.string().trim().lowercase().email()
    //    Joi.number().integer().min(4000000000).max(9999999999)
     )
    .required()
    // .error(new Error("Invalid email or mobile number"))
});


// checking if new email is valid or not
const updateSignupEmailSchema = Joi.object({
    newEmail: Joi.string().trim().lowercase().email().required()
})

// checking is new Mobile number is valid or not
const updateSignupMobileSchema = Joi.object({
    newMobileNumberCountryCode: Joi.number().integer().required(),
    newMobileNumber: Joi.number().integer().min(4000000000).max(9999999999).required()
})

// to get a user we just need to have either a valid emial or valid phone number
const getUserSchema = Joi.object({
    emailOrMobile: Joi.alternatives()
    .try(
       Joi.string().lowercase().trim().email(),
       Joi.number().integer().min(4000000000).max(9999999999)
     )
    .required()
    // .error(new Error("Invalid email or mobile number"))
})

// checking if the entered otp is valid or not, and it contains the "for" field or not
const otpSchema = Joi.object({
    otpValue: Joi.string().length(5).required(),
    for: Joi.number().integer().min(0).max(2)
})


exports.validateSignup = validator(signupSchema);

exports.validateSignin = validator(signinSchema);

exports.validateUpdateSignupEmail = validator(updateSignupEmailSchema)
exports.validateUpdateSignupMobile = validator(updateSignupMobileSchema)
exports.validateGetUser = validator(getUserSchema)
exports.validateOtp = validator(otpSchema); 
exports.validateAddToWaitingListSchema = validator(addToWaitingListSchema); 


exports.validateCreateUserAccount = validator(createUserAccountSchema);


// Verification code to check if password is valid or not
// atleast 1 upperCase, 1 lowerCase, 1 number and one special character (defined in variables.specialChar)
exports.validPassword = (password) => {
    if(password == null || password == undefined || password.length<variable.minPasswordLength || password.length>variable.maxPasswordLength){
        return false;
    }
    password = password.trim();
    let lower=0, upper=0, numeric=0, special=0;
    let invalid = false;
    const specialChar = "!@#$%^&*()_/?.><,:;'{}\"[]+=~`";
    // process.env.SPECIAL_CHAR_IN_PASSWORD;
    const a = 97, A=65, o=48;

    for(let i=0; i<password.length; i++){
        let ch = password.charCodeAt(i);

        if(ch-a>=0 && ch-a<=25){
            lower += 1;
        }
        else if(ch-A>=0 && ch-A<=25){
            upper += 1;
        }
        else if(ch-o>=0 && ch-o<=9){
            numeric += 1;
        }
        else{
            let found = false;
            for(let j=0; j<specialChar.length; j++){
                if(password[i] == specialChar[j]){
                    found = true;
                    special += 1;
                    break;
                }
            }
            if(!found) return false;
        }
    }

    // console.log(invalid+" "+lower+" "+upper+" "+special+" "+numeric)

    if(invalid || (lower==0 && upper==0) || numeric==0){
        return false
    }

    return true
}