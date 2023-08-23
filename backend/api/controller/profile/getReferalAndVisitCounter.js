// const profile = require("../../model/profile");
const Profile = require("../../model/profile");
const UsedUrl = require("../../model/usedUrl");


exports.getReferalAndVisitCounter = async (req, res) => {

    const profileId = req.body.user.profileId;
    
    // const usedUrl = await UsedUrl.findOne({profileId: profileId}).exec();
    const profile = await Profile.findById(profileId).exec();
    // console.log(usedUrl)

    if(!profile){
        return res.status(401).json({
            success: false, 
            error: 'Data not found!'
        })
    }
    const referalCode = req.body.user.referalCode;
    const visitCounter = profile.profileVisitCount;
    const userName = `${profile.firstName} ${profile.lastName}`

    return res.status(200).json({
        success: true,
        data: {
            referalCode,
            visitCounter,
            userName
        }
    })
}