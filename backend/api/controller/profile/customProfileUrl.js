const Profile = require("../../model/profile");
const UsedUrl = require("../../model/usedUrl");
const { generateQrCode } = require("../card/generateQrCode");
const {validateCustomUrl} = require("../requestValidator/profileValidator")

const {allUser} = require("../ViewController")


const updateUsedUrlIdInProfile = (req, res, next, profileId, usedUrlId) => {

    Profile.findByIdAndUpdate(profileId,{
        profileUrl: usedUrlId
    },{ upsert: false, new: true}).exec()
        .then(updatedProfile => {
            if(updatedProfile){
                next();
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: 'Something went wrong'
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                    error: 'Something went wrong'
            })
        })

}


exports.customProfileUrl = async (req, res, next) => {


    const user = req.body.user;
    // console.log(req.body);
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const result = await validateCustomUrl(req.body)

    if(result.success){

        const isUrlFound = await UsedUrl.findOne({url: req.body.customUrl}).exec()
            .then(result => {
                if(result){
                    if(result.profileId.equals(user.profileId)){
                        return {
                            found: true,
                            error: false,
                            usedUrlId: result._id
                        }
                    }
                    return {
                        found: true,
                        error: "URL not available!"
                    }
                }else{
                    return {
                        found: false,
                        error: false
                    }
                }
                
            })
            .catch(err => {
                return {
                    error: "Something went wrong!"
                }
            })
        // console.log(isUrlFound);
        if(isUrlFound.error){
            return res.status(409).json({
                success: false,
                error: isUrlFound.error,
            })
        }
        
        if(isUrlFound.found){ // and it belongs to the same user
            return updateUsedUrlIdInProfile(req, res, next, user.profileId, isUrlFound.usedUrlId);
        }
        else{ // url is not found in database and it can be assigned to the user

            const newUrl = new UsedUrl({
                url: req.body.customUrl,
                profileId: user.profileId
            })
    
            newUrl.save()
                .then(savedUrl => {
                    if(savedUrl){
                        // URL has been saved successfully
                        return updateUsedUrlIdInProfile(req, res, next, user.profileId, savedUrl._id)
                    
                    }else{
                        return res.status(409).json({
                            success: false,
                            error: "URL not available",
                        })
                    }
                })
                .catch(err => {
                    // console.log(err);
                    return res.status(500).json({
                        success: false,
                            error: 'URL not available'
                    })
                })

        }
    }else{
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }

} 