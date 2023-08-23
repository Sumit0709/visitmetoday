const ProfessionalProfile = require("../../../model/professionalProfile");
// const Profile = require("../../model/profile");
const Signup = require("../../../model/signup");

exports.getProfessionalPublicProfile = async (req, res) => {

    const profileId = req.body.profileId? req.body.profileId: req.body.user.profileId;
    // console.log(profileId);


    ProfessionalProfile.findByIdAndUpdate(profileId,{
        $inc:{profileVisitCount:1}
    },{new: true, upsert: false})
    .exec()
    .then(result => {
        if(result){
            // profile found

            Signup.findById(result.signupId)
                .exec()
                .then(r => {
                    
                    let response = {

                        companyFirstName: result.companyFirstName,
                        companyMiddleName: result.companyMiddleName,
                        companyLastName: result.companyLastName,
                        sellOnline: result.sellOnline,
                        since: result.since,
                        country: result.country,
                        dealsIn: result.dealsIn,
                        servesInArea: result.servesInArea,

                    };
                    if(result.showLinkedIn) response = {...response, linkedIn: result.linkedIn}
                    if(result.showTwitter) response = {...response, twitter: result.twitter}
                    if(result.showYoutube) response = {...response, youtube: result.youtube}
                    if(result.showGitHub) response = {...response, gitHub: result.gitHub}
                    if(result.showQuora) response = {...response, quora: result.quora}
                    if(result.showSpotify) response = {...response, spotify: result.spotify}
                    if(result.showMedium) response = {...response, medium: result.medium}
                    if(result.showFacebook) response = {...response, facebook: result.facebook}
                    if(result.showInstagram) response = {...response, instagram: result.instagram}
                    if(result.showSnapchat) response = {...response, snapchat: result.snapchat}
                    if(result.showDiscord) response = {...response, discord: result.discord}
                    if(result.showTwitch) response = {...response, twitch: result.twitch}
                    if(result.showVimeo) response = {...response, vimeo: result.vimeo}
                    if(result.showTinder) response = {...response, tinder: result.tinder}
                    if(result.showTelegram) response = {...response, telegram: result.telegram}
                    
                    if(result.showLocation) response = {...response, location: result.location}
                    if(result.showWebsite) response = {...response, website: result.website}
                    
                    if(result.showProfileEmail) response = {...response, profileEmail: result.profileEmail}
                    if(result.showWhatsapp) {
                        if(result.isWhatsappAndContactNumberSame){
                            response = {...response, whatsapp: result.contactNumber, whatsappCountryCode: result.contactNumberCountryCode}
                        }
                        else {
                            response = {...response, whatsapp: result.whatsapp, whatsappCountryCode:result.whatsappCountryCode}
                        }
                    }
                    if(result.showContactNumber){ 
                        response = {...response, contactNumber: result.contactNumber, contactNumberCountryCode: result.contactNumberCountryCode}
                    }
        

                    // response = {...response, referalCode: r.referalCode};

                    return res.status(200).json({
                        success: true,
                        profile: response
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        error: 'something went wrong!'
                    })
                })

            
        }else{
            return res.status(404).json({
                success: false,
                error: "profile doesn't exist"
            })
        }
    })
    .catch(err => {
        return res.status(401).json({
            success: false,
            error: err.message
        })
    })

}