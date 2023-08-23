const Profile = require("../../model/profile")

exports.getProfilePhoto = async (req, res) => {

    let profileId 
    if(req.body.user) profileId = req.body.user.profileId;
    else if(req.body.profileId) profileId = req.body.profileId
    // else profileId = req.params.profileId


    Profile.findById(profileId)
    .exec()
    .then(result => {
        if(result){
            // profile found
            res.set("Content-Type", "Image/png");
            return res.send(result.photo);
        
        }else{
            return res.status(404).json({
                success: false,
                error: "Profile not found"
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