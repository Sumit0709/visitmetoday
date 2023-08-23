const Profile = require("../../model/profile")
const UsedUrl = require("../../model/usedUrl")

exports.getProfile = async (req, res) => {

    const profileId = req.body.profileId? req.body.profileId: req.body.user.profileId;
    // console.log(profileId);

    Profile.findById(profileId)
    .exec()
    .then(async result => {
        if(result){
            // profile found

            const usedUrl = await UsedUrl.findById(result.profileUrl)
            
            const response = {
                firstName: result.firstName,
                middleName: result.middleName,
                lastName: result.lastName,
                gender: result.gender,
                age: result.age,
                country: result.country,
                motto: result.motto,
                personality: result.personality,

                linkedIn: result.linkedIn,
                twitter: result.twitter,
                youtube: result.youtube,
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
                telegram: result.telegram,

                // location: result.location,
                website: result.website,

                profileEmail: result.profileEmail,
                whatsappCountryCode: result.whatsappCountryCode,
                whatsapp: result.whatsapp,
                contactNumberCountryCode: result.contactNumberCountryCode,
                contactNumber: result.contactNumber,
                isWhatsappAndContactNumberSame: result.isWhatsappAndContactNumberSame,
                
                showLinkedIn: result.showLinkedIn,
                showTwitter: result.showTwitter,
                showYoutube: result.showYoutube,
                showGitHub: result.showGitHub,
                showQuora: result.showQuora,
                showSpotify: result.showSpotify,
                showMedium: result.showMedium,
                showInstagram: result.showInstagram,
                showSnapchat: result.showSnapchat,
                showDiscord: result.showDiscord,
                showTwitch: result.showTwitch,
                showVimeo: result.showVimeo,
                showTinder: result.showTinder,
                showFacebook: result.showFacebook,
                showTelegram: result.showTelegram,
                
                // showLocation: result.showLocation,
                showWebsite: result.showWebsite,

                showProfileEmail: result.showProfileEmail,
                showWhatsapp: result.showWhatsapp,
                showContactNumber: result.showContactNumber,

                referalCode: req.body.user.referalCode,
                visitCounter: result.profileVisitCount
            }
            return res.status(200).json({
                success: true,
                profile: response
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
            error: 'something went wrong!'
        })
    })

}