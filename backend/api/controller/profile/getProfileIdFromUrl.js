const UsedUrl = require("../../model/usedUrl")

exports.getProfileIdFromUrl = async (req, res, next) => {

    const url = req.params.profileUrl

    // UsedUrl.findOneAndUpdate({url: url},{
    //     $inc:{visitCounter:1}
    // },{new: true, upsert: false})
    UsedUrl.findOne({url: url})
    .exec()
    .then(result => {
        if(result){
            // url found
            req.body.profileId = result.profileId;
            next();
            // return res.status(200).json({
            //     success: true,
            //     result: result
            // })
        }else{
            return res.status(404).json({
                success: false,
                error: "url doesn't match any profile"
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