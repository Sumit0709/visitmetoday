const variable = {

    superAdmin: 261220222,

    // domain
    domain: 'visitme.today',

    // Validation
    minPasswordLength: 6,
    maxPhotoSizeInBytes: 8388608, // 8 Mega Bytes 
    // 5242880,// 5 Mega Bytes
    validFileExt: ['jpg', 'png', 'jpeg'],

    //Recaptcha site key
    RECAPTCHA_SITE_KEY: "6LdxbSUkAAAAACuzLKg8SrjCvc9_J4LPemEQUa7P",

    // Counter
    counterId: "63bee83a100d8729bf135e6a",

    minPasswordLength: 5,
    maxPasswordLength: 50,
    specialChar: "@.!&",
    // OTP
    otpForForgotPassword: 0,
    otpForVerifyingEmail: 1,
    otpForVerifyingMobile: 2,
    otpExpiryMin: 1,

    // SALT
    salt: 10,

    // PROFILE
    minFirstNameLength: 2,
    maxFirstNameLength: 20,
    minMiddleNameLength: 2,
    maxMiddleNameLength: 20,
    minLastNameLength: 2,
    maxLastNameLength: 20,

    endingGenderIndex: 3,

    minAge: 1,
    maxAge: 100,

    maxCountryIndex: 195,

    minMottoLength: 5,
    maxMottoLength: 20,
    minPersonalityLength: 5,
    maxPersonalityLength: 35,


    // FILE CONSTRAINTS
    // maxFileSizeInBytes: 5*1024*1024, // 5Mb
    validFileMIMEType: ['image/png','image/jpg','image/jpeg'], 
    
    // URL
    maxCustomUrlLength: 30
}

// module.exports = constraints;
export default variable;
