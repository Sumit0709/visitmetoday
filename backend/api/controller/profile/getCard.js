const Profile = require("../../model/profile")

const {allUser} = require("../ViewController")

exports.getCard = async (req, res) => {

    console.log("CARD")
    // const user = req.body.user;
    // Controller for view
    // const viewResult = allUser(req,res);
    // if(viewResult.success == false){
    //     return res.status(401).json(viewResult);
    // }
    
    const profileId = req.body.profileId? req.body.profileId: req.body.user.profileId;

    Profile.findById(profileId)
    .exec()
    .then(result => {
        if(result){
            // profile found

            if(result.sharingImage){
                // console.log(result.sharingImage)
                res.writeHead(200, {
                    'Content-Type': 'Image/png'
                });

                // res.set("Content-Type", "Image/png"); 
                res.write(result.sharingImage);
                return res.end();
            }else{
                return res.status(404).json({
                    success: false,
                    error: "Create Card!"
                })
            }
        
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