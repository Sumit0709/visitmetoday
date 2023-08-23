// const profile = require("../../model/profile");
const ProfessionalProfile = require("../../../model/professionalProfile");


exports.getProfessionalReferalAndVisitCounter = async (req, res) => {

    const professionalProfileId = req.body.user.professionalProfileId;
    
    // const usedUrl = await UsedUrl.findOne({profileId: profileId}).exec();
    const professionalProfile = await ProfessionalProfile.findById(professionalProfileId).exec();
    // console.log(usedUrl)

    if(!professionalProfile){
        return res.status(401).json({
            success: false, 
            error: 'Data not found!'
        })
    }
    const referalCode = req.body.user.referalCode;
    const visitCounter = professionalProfile.profileVisitCount;
    const userName = `${professionalProfile.firstName} ${professionalProfile.lastName}`

    return res.status(200).json({
        success: true,
        data: {
            referalCode,
            visitCounter,
            userName
        }
    })
}