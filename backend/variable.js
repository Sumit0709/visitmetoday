const constraints = {

    // Referals
    defaultReferals: 5,
    referalCodeLength: 5,
    defaultRemainingReferals: 5,

    // Counter
    counterId: "xxxx****xxxx",

    minPasswordLength: 6,
    maxPasswordLength: 50,
    specialChar: "@.!&",
    // OTP
    otpForForgotPassword: 0,
    otpForVerifyingEmail: 1,
    otpForVerifyingMobile: 2,
    otpExpiryMin: 1,

    // otpFor: [0,1,2],

    // SALT
    salt: 'x',

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

    minMottoLength: 0,
    maxMottoLength: 50,
    minPersonalityLength: 0,
    maxPersonalityLength: 50,


    // FILE CONSTRAINTS
    maxFileSizeInBytes:  8388608, // 8 Mega Bytes 
    // 5242880,//5*1024*1024, // 5MB
    validFileMIMEType: ['image/png','image/jpg','image/jpeg'], 
    
    // URL
    maxCustomUrlLength: 30
}

module.exports = constraints;
