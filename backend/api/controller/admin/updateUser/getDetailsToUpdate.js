const Profile = require("../../../model/profile");
const Signup = require("../../../model/signup");
const { admin } = require("../../ViewController");


exports.getDetailsToUpdate = async(req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const userId = req.params.userId;
    // console.log(userId);

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

    const basicProfile = {
        "firstName": profile.firstName? profile.firstName: "" ,
        "middleName": profile.middleName? profile.middleName: "" ,
        "lastName": profile.lastName? profile.lastName: "" ,
        "gender": profile.gender,
        "age": profile.age? profile.age: "" ,
        "country": profile.country,
        "motto": profile.motto? profile.motto: "" ,
        "personality": profile.personality? profile.personality: "" ,
    }


    const extendedProfile = {
        "gitHub" : profile.gitHub? profile.gitHub: '',
        "quora" : profile.quora ? profile.quora: '' ,
        "spotify" : profile.spotify ? profile.spotify: '' ,
        "medium" : profile.medium ? profile.medium: '' ,
        "instagram" : profile.instagram ? profile.instagram: '' ,
        "snapchat" : profile.snapchat ? profile.snapchat: '' ,
        "discord" : profile.discord ? profile.discord: '' ,
        "twitch" : profile.twitch ? profile.twitch: '' ,
        "vimeo" : profile.vimeo ? profile.vimeo: '' ,
        "tinder" : profile.tinder ? profile.tinder: '' ,
        "facebook" : profile.facebook ? profile.facebook: '' ,
        "linkedIn" : profile.linkedIn ?  profile.linkedIn: '' ,
        "youtube" : profile.youtube ? profile.youtube: '' ,
        "profileEmail" : profile.profileEmail ? profile.profileEmail: '' ,
        "twitter" : profile.twitter ? profile.twitter: '' ,
        "telegram" : profile.telegram ? profile.telegram: '' ,
        "whatsappCountryCode" : profile.whatsappCountryCode ? profile.whatsappCountryCode: '' ,
        "whatsapp" : profile.whatsapp ? profile.whatsapp: '' ,
        "contactNumberCountryCode" : profile.contactNumberCountryCode ? profile.contactNumberCountryCode: '' ,
        "contactNumber" : profile.contactNumber ? profile.contactNumber: '' ,
    }


    return res.status(200).json({
        success: true,
        basicProfile: basicProfile,
        extendedProfile: extendedProfile,

        countries: req.countries,
        mobileNumberCountryCode: req.mobileNumberCountryCode
    })

}