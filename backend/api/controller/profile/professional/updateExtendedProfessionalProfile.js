const ProfessionalProfile = require("../../../model/professionalProfile");

const { validateExtendedProfile } = require("../../requestValidator/profileValidator")

const {allUser} = require("../../ViewController")

exports.updateExtendedProfessionalProfile = async (req, res) => {

    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const signupId = req.body.user._id;
    const professionalProfileId = req.body.user.professionalProfileId;


    const result = await validateExtendedProfile(req.body);

    if(!result.success){
        return res.status(401).json({
            success: false,
            error: "Invalid input",
            message: result.error
        })
    }else{

        let updates = {};
        if(req.body.linkedIn) updates = {...updates, linkedIn: req.body.linkedIn}
        if(req.body.twitter) updates = {...updates, twitter: req.body.twitter}
        if(req.body.youtube) updates = {...updates, youtube: req.body.youtube}
        if(req.body.gitHub) updates = {...updates, gitHub: req.body.gitHub}
        if(req.body.quora) updates = {...updates, quora: req.body.quora}
        if(req.body.spotify) updates = {...updates, spotify: req.body.spotify}
        if(req.body.medium) updates = {...updates, medium: req.body.medium}
        if(req.body.facebook) updates = {...updates, facebook: req.body.facebook}
        if(req.body.instagram) updates = {...updates, instagram: req.body.instagram}
        if(req.body.snapchat) updates = {...updates, snapchat: req.body.snapchat}
        if(req.body.discord) updates = {...updates, discord: req.body.discord}
        if(req.body.twitch) updates = {...updates, twitch: req.body.twitch}
        if(req.body.vimeo) updates = {...updates, vimeo: req.body.vimeo}
        if(req.body.tinder) updates = {...updates, tinder: req.body.tinder}
        if(req.body.telegram) updates = {...updates, telegram: req.body.telegram}
        
        if(req.body.location) updates = {...updates, location: req.body.location}
        if(req.body.website) updates = {...updates, website: req.body.website}

        if(req.body.profileEmail) updates = {...updates, profileEmail: req.body.profileEmail.toLowerCase()}
        // if(req.body.whatsappCountryCode) updates = {...updates, whatsappCountryCode: req.body.whatsappCountryCode}
        if(req.body.whatsapp) updates = {...updates, whatsapp: req.body.whatsapp, whatsappCountryCode: req.body.whatsappCountryCode}
        // if(req.body.contactNumberCountryCode) updates = {...updates, contactNumberCountryCode: req.body.contactNumberCountryCode}
        if(req.body.contactNumber) updates = {...updates, contactNumber: req.body.contactNumber, contactNumberCountryCode: req.body.contactNumberCountryCode}
        // if(req.body.isWhatsappAndContactNumberSame) 
        updates = {...updates, isWhatsappAndContactNumberSame: false}
        
        // if(req.body.showLinkedIn) 
        updates = {...updates, showLinkedIn: req.body.showLinkedIn}
        // if(req.body.showTwitter) 
        updates = {...updates, showTwitter: req.body.showTwitter}
        // if(req.body.showYoutube)
        updates = {...updates, showYoutube: req.body.showYoutube}
        // if(req.body.showGitHub) 
        updates = {...updates, showGitHub: req.body.showGitHub}
        // if(req.body.showQuora) 
        updates = {...updates, showQuora: req.body.showQuora}
        // if(req.body.showSpotify) 
        updates = {...updates, showSpotify: req.body.showSpotify}
        // if(req.body.showMedium) 
        updates = {...updates, showMedium: req.body.showMedium}
        // if(req.body.showFacebook) 
        updates = {...updates, showFacebook: req.body.showFacebook}
        // if(req.body.showInstagram) 
        updates = {...updates, showInstagram: req.body.showInstagram}
        // if(req.body.showSnapchat) 
        updates = {...updates, showSnapchat: req.body.showSnapchat}
        // if(req.body.showDiscord) 
        updates = {...updates, showDiscord: req.body.showDiscord}
        // if(req.body.showTwitch) 
        updates = {...updates, showTwitch: req.body.showTwitch}
        // if(req.body.showVimeo) 
        updates = {...updates, showVimeo: req.body.showVimeo}
        // if(req.body.showTinder) 
        updates = {...updates, showTinder: req.body.showTinder}
        // if(req.body.showTelegram) 
        updates = {...updates, showTelegram: req.body.showTelegram}

        updates = {...updates, showLocation: req.body.showLocation}
        updates = {...updates, showWebsite: req.body.showWebsite}
        
        // if(req.body.showProfileEmail) 
        updates = {...updates, showProfileEmail: req.body.showProfileEmail}
        // if(req.body.showWhatsApp) 
        updates = {...updates, showWhatsapp: req.body.showWhatsapp}
        // if(req.body.showContactNumber) 
        updates = {...updates, showContactNumber: req.body.showContactNumber}


        // console.log("REQ BODY")
        // console.log(req.body)

        console.log("PROFILE DATA TO BE UPDATED")
        console.log(updates);


        ProfessionalProfile.findByIdAndUpdate(professionalProfileId,updates,{upsert: false, new: true})
            .exec()
            .then(result => {
                if(result){
                    // profile successfully updated
                    console.log("Extended Professional Profile updated Successfully");

                    return res.status(200)
                        .json({
                            success: true,
                            message: "Extended Professional Profile updated Successfully",
                            // result: result
                        })
                }else{
                    return res.status(401).json({
                        success: false,
                        error: "Professional Profile update failed! please try again."
                    })
                }
            })
            .catch(err => {
                console.log(err.message);
                return res.status(401).json({
                    success: false,
                    error: 'Something went wrong'
                })
            })

    }
}