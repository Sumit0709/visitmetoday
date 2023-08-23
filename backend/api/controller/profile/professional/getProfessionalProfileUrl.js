const UsedUrl = require("../../../model/usedUrl")
const AvailableUrl = require("../../../model/availableUrl")
const Profile = require("../../../model/profile");
const ProfessionalProfile = require("../../../model/professionalProfile");
const ProfessionalUsedUrl = require("../../../model/professionalUsedUrl");

let newAssignedUrl = null;

const updateProfileUrl = async(professionalProfileId) => {


    // get any random available url
    const availableUrl = await AvailableUrl.aggregate([{$sample:{size:1}}]);
    const availableUrlId = availableUrl[0]._id;
    const availableUrlValue = availableUrl[0].url;

    // deleting url from available database
    AvailableUrl.findByIdAndDelete(availableUrlId)
        .exec()
        .then(deletedUrl => {
            if(deletedUrl){
                // url deleted successfully
                // console.log("Avaialable Urls ");
                // console.log(availableUrl);
                // console.log(availableUrlId, availableUrlValue);

                const newUrl = new ProfessionalUsedUrl({
                    url: availableUrlValue,
                    professionalProfileId: professionalProfileId
                });

                newUrl.save()
                    .then(savedUrl => {
                        if(savedUrl){
                            // url has been successfully saved and alloted to user
                            // now save it's reference in user's profile

                            // console.log("SAVED URL ID", savedUrl._id);

                            ProfessionalProfile.findByIdAndUpdate(professionalProfileId,{professionalProfileUrl: savedUrl._id})
                                .exec()
                                .then(updatedProfile => {
                                    if(updatedProfile){
                                        // everything finished successfully
                                        newAssignedUrl = availableUrlValue;
                                        console.log("Url has been successfully alloted to the profile")
                                    }
                                    else{
                                        console.log("Error in updating Profile")
                                    }
                                })
                                .catch(err => {
                                    console.log("Error in updating Profile -> in catch")
                                    console.log(err.message)
                                })

                        }else{
                            // url has not been saved
                            console.log("Error in saving url in usedUrl collection")
                        }
                    })
            }
            else{
                console.log("URL not deleted from available list, so can't assign to new profile")
            }
        })
        .catch(err => {
            console.log("Error in deleting URL from available url collection -> in ctach")
        })

}

exports.getProfessionalProfileUrl = async (req, res, next) => {

    const professionalProfileId = req.body.user.professionalProfileId
    // console.log(profileId)
    const professionalProfile = await ProfessionalProfile.findById(professionalProfileId);

    ProfessionalUsedUrl.findById(professionalProfile.professionalProfileUrl)
    .exec()
    .then(async result => {
        if(result){
            // url found for this profile
            return res.status(200).json({
                success: true,
                url: result.url
            });
        }else{
            // no url is not assigned to this profile
            // we can create a random url for this profile and update profile with this url
            await updateProfileUrl(professionalProfileId);
            if(newAssignedUrl != null){
                return res.status(200).json({
                    success: true,
                    url: newAssignedUrl
                });
            }
            else{
                return res.status(404).json({
                    success: false,
                    error: "url is not assigned to this profile",
                    result: result
                })
            }
        }
    })
    .catch(err => {
        return res.status(401).json({
            success: false,
            error: err.message
        })
    })

}