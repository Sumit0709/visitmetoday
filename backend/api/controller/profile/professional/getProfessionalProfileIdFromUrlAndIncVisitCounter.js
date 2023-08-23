const ProfessionalUsedUrl = require("../../../model/professionalUsedUrl");
// const UsedUrl = require("../../model/usedUrl")

exports.getProfessionalProfileIdFromUrlAndIncVisitCounter = async (req, res, next) => {

    const url = req.params.profileUrl

    ProfessionalUsedUrl.findOneAndUpdate({url: url},{
        $inc:{visitCounter:1}
    },{new: true, upsert: false})
    .exec()
    .then(result => {
        if(result){
            // url found
            req.body.profileId = result.professionalProfileId;
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