const Profile = require("../../model/profile");
const Signup = require("../../model/signup");
const UsedUrl = require("../../model/usedUrl");
const { admin } = require("../ViewController");


exports.getAllDetailsOfAUser = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log("IP = ",ip);

    const userId = req.params.userId;
    const user = await Signup.findById(userId).exec();

    if(!user){
        return res.status(404).json({
            success: false,
            error: "User not found"
        })
    }

    const profileId = user.profileId;

    const profile = await Profile.findById(profileId).exec();
    if(!profile){
        return res.status(404).json({
            success: false,
            error: "Profile not found"
        })
    }

    const profileUrlDoc = await UsedUrl.findById(profile.profileUrl).exec();
    
    if(!profileUrlDoc){
        return res.status(404).json({
            success: false,
            error: "ProfileUrlDoc  not found"
        })
    }

    const countryName = req.countries[profile.country];
    const countryCodeWithName = req.mobileNumberCountryCode[user.mobileNumberCountryCode];
    
    const details = {
        email: user.email,
        mobileNumberCountryCode: countryCodeWithName,
        mobileNumber: user.mobileNumber,
        isEmailVerified: user.isEmailVerified? "YES": "NO",
        isMobileNumberVerified: user.isMobileNumberVerified? "YES": "NO",
        referalCode: user.referalCode,
        ipAddress: user.ipAddress,
        // userAgent: user.userAgent,
        isActive: user.isActive? "YES": "NO",
        
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        gender: profile.gender,
        age: profile.age,
        ageInsertedAt: profile.ageInsertedAt,
        country: countryName,
        motto: profile.motto,
        personality: profile.personality,
        profileVisitCount: profile.profileVisitCount,
        
        profileUrl: profileUrlDoc.url,
        
    }

    return res.status(200).json({
        success: true,
        details: details,
        // profileId: profileId,
        verificationId: user.verificationId,
        
    })
    
}