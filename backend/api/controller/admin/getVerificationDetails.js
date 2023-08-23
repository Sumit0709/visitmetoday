const Profile = require('../../model/profile');
const Signup = require('../../model/signup');
const Verification = require('../../model/verification');

const { admin } = require("../ViewController")

exports.getVerificationDetails = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const ip_list = req.ip;
    console.log(ip_list);

    const userId = req.params.userId;

    const user = await Signup.findById(userId).exec();

    if(!user){
        return res.status(404).json({
            success: false,
            error: "User not found"
        })
    }

    const verificationId = user.verificationId;
    const profileId = user.profileId;

    const profile = await Profile.findById(profileId).exec();
    if(!profile){
        return res.status(404).json({
            success: false,
            error: "profile not found"
        })
    }

    const email = user.email;
    const name = profile.firstName + profile.middleName? (" "+profile.middleName): '' + profile.lastName? (" " + profile.lastName): '';


    Verification.findById(verificationId, {
        _id: 0,
        signupId: 0,
        __v: 0
    })
        .exec()
        .then(result => {
            if(result){

                const verificationDetails = {
                    gitHub: result.gitHub,
                    quora: result.quora,
                    spotify: result.spotify,
                    medium: result.medium,
                    instagram: result.instagram,
                    snapchat: result.snapchat,
                    discord: result.discord,
                    twitch: result.twitch,
                    vimeo: result.vimeo,
                    tinder: result.tinder,
                    facebook: result.facebook,
                    linkedIn: result.linkedIn,
                    youtube: result.youtube,
                    profileEmail: result.profileEmail,
                    twitter: result.twitter,
                    telegram: result.telegram,
                    location: result.location,
                    website: result.website,
                    whatsapp: result.whatsapp,
                    contactNumber: result.contactNumber,
                }

                const extendedProfileDetails = {
                    gitHub: profile.gitHub? profile.gitHub:"",
                    quora: profile.quora? profile.quora:"",
                    spotify: profile.spotify? profile.spotify:"",
                    medium: profile.medium? profile.medium:"",
                    instagram: profile.instagram? profile.instagram:"",
                    snapchat: profile.snapchat? profile.snapchat:"",
                    discord: profile.discord? profile.discord:"",
                    twitch: profile.twitch? profile.twitch:"",
                    vimeo: profile.vimeo? profile.vimeo:"",
                    tinder: profile.tinder? profile.tinder:"",
                    facebook: profile.facebook? profile.facebook:"",
                    linkedIn: profile.linkedIn? profile.linkedIn:"",
                    youtube: profile.youtube? profile.youtube:"",
                    profileEmail: profile.profileEmail? profile.profileEmail:"",
                    twitter: profile.twitter? profile.twitter:"",
                    telegram: profile.telegram? profile.telegram:"",
                    location: profile.location? profile.location:"",
                    website: profile.website? profile.website:"",
                    whatsapp: profile.whatsapp? profile.whatsapp:"",
                    contactNumber: profile.contactNumber? profile.contactNumber:"",
                }

                return res.status(200).json({
                    success: true,
                    verificationDetails : verificationDetails,
                    extendedProfileDetails: extendedProfileDetails,

                    name: name,
                    email: email,
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "Verification Document not found for this User"
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        })

   

}