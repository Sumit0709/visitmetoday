

exports.doesProfessionalProfileExist = async(req, res) => {

    // console.log("ProfessionalProfile ID", req.body.user.professionalProfileId)
    if(req.body.user.professionalProfileId){
        return res.status(200).json({
            success: true
        })
    }else{
        return res.status(200).json({
            success: false
        })
    }

}