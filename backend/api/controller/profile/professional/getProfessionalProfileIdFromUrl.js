const professionalUsedUrl = require("../../../model/professionalUsedUrl");
// const UsedUrl = require("../../model/usedUrl")

exports.getProfessionalProfileIdFromUrl = async (req, res, next) => {

    const url = req.params.professionalProfileUrl

    // UsedUrl.findOneAndUpdate({url: url},{
    //     $inc:{visitCounter:1}
    // },{new: true, upsert: false})
    professionalUsedUrl.findOne({url: url})
    .exec()
    .then(result => {
        if(result){
            // url found
            req.body.professionalProfileId = result.professionalProfileId;
            next();
            // return res.status(200).json({
            //     success: true,
            //     result: result
            // })
        }else{
            // console.log("url doesn't match any profile")
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