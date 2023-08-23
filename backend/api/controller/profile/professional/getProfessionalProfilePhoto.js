const ProfessionalProfile = require("../../../model/professionalProfile")

exports.getProfessionalProfilePhoto = async (req, res) => {

    let professionalProfileId 
    if(req.body.user) professionalProfileId = req.body.user.professionalProfileId;
    else if(req.body.professionalProfileId) professionalProfileId = req.body.professionalProfileId
    // else profileId = req.params.profileId


    ProfessionalProfile.findById(professionalProfileId)
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