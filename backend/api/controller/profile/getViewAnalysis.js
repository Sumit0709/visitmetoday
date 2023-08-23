const Profile = require("../../model/profile");



exports.getViewAnalysis = async (req, res) => {

    const profileId = req.body.user.profileId;

    Profile.findById(profileId).exec()
        .then(profile => {
            if(profile){
                return res.status(200).json({
                    success: true,
                    profileVisitCount: profile.profileVisitCount
                })
            }
            else{
                return res.status(404).json({
                    success: false,
                    error: 'Something went wrong while fetching your data'
                })
            }
        })
        .catch(err => {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                error: 'Something went wrong while fetching your data'
            })
        })
}