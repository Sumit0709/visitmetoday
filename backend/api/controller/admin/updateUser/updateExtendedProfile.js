const Profile = require("../../../model/profile");
const Signup = require("../../../model/signup");
const { validateExtendedProfile } = require("../../requestValidator/profileValidator");
const { admin } = require("../../ViewController");


exports.updateExtendedProfile = async(req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const result = await validateExtendedProfile(req.body);

    // console.log(req.body);

    if(!result.success){
        console.log(result);

        return res.status(401).json({
            success: false,
            error: "Invalid input",
            message: result.error
        })
    }else{

        const userId = req.params.userId;
        const user = await Signup.findById(userId).exec();
        if(!user){
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        const profileId = user.profileId;

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
        if(req.body.profileEmail) updates = {...updates, profileEmail: req.body.profileEmail.toLowerCase()}
        
        if(req.body.whatsappCountryCode) updates = {...updates, whatsappCountryCode: req.body.whatsappCountryCode}
        
        if(req.body.whatsapp) updates = {...updates, whatsapp: req.body.whatsapp, whatsappCountryCode: req.body.whatsappCountryCode}
        if(req.body.contactNumberCountryCode) updates = {...updates, contactNumberCountryCode: req.body.contactNumberCountryCode}
        if(req.body.contactNumber) updates = {...updates, contactNumber: req.body.contactNumber, contactNumberCountryCode: req.body.contactNumberCountryCode}
        

        Profile.findByIdAndUpdate(profileId,updates,{new: true, upsert: false}).exec()
        .then(result => {
            
            if(result){
                    return res.status(200).json({
                        success: true,
                        message: 'Done'
                    })
                }
                else{
                    return res.status(401).json({
                        success: false,
                        error: 'Document NOT Updated'
                    })
                }
            })
            .catch(err => {

                return res.status(500).json({
                    success: false,
                    error: err.messsage
                })
            })

    }   

}