const AvailableUrl = require("../../model/availableUrl");
const Profile = require("../../model/profile");
const UsedUrl = require("../../model/usedUrl");

exports.updateProfileUrl = async (req, res, next) => {

    // get any random available url
    const availableUrl = await AvailableUrl.aggregate([{$sample:{size:1}}]);
    const availableUrlId = availableUrl[0]._id;
    const availableUrlValue = availableUrl[0].url;

    console.log(req.body);

    // deleting url from available database
    AvailableUrl.findByIdAndDelete(availableUrlId)
        .exec()
        .then(deletedUrl => {
            if(deletedUrl){
                // url deleted successfully
                // console.log("Avaialable Urls ");
                // console.log(availableUrl);
                // console.log(availableUrlId, availableUrlValue);

                const newUrl = new UsedUrl({
                    url: availableUrlValue,
                    profileId: req.body.createdProfile._id
                });

                newUrl.save()
                    .then(savedUrl => {
                        if(savedUrl){
                            // url has been successfully saved and alloted to user
                            // now save it's reference in user's profile

                            // console.log("SAVED URL ID", savedUrl._id);

                            Profile.findByIdAndUpdate(req.body.createdProfile._id,{profileUrl: savedUrl._id})
                                .exec()
                                .then(updatedProfile => {
                                    if(updatedProfile){
                                        // everything finished successfully
                                        next()
                                        console.log("Url has been successfully alloted to the profile")
                                    }
                                    else{
                                        console.log("Error in updating Profile")
                                        return res.status(401).json({
                                            success: false, 
                                            error: 'url allocation failed'
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log("Error in updating Profile -> in catch")
                                    console.log(err.message)
                                    return res.status(500).json({
                                        success: false, 
                                        error: 'something went wrong'
                                    })
                                })

                        }else{
                            // url has not been saved
                            console.log("Error in saving url in usedUrl collection")
                            return res.status(401).json({
                                success: false, 
                                error: 'url allocation failed'
                            })
                        }
                    })
            }
            else{
                console.log("URL not deleted from available list, so can't assign to new profile")
                return res.status(401).json({
                    success: false, 
                    error: 'url allocation failed'
                })
            }
        })
        .catch(err => {
            console.log("Error in deleting URL from available url collection -> in ctach")
            console.log(err);
            return res.status(401).json({
                success: false, 
                error: 'url allocation failed'
            })
        })

}