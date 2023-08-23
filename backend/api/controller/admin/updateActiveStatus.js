const Signup = require("../../model/signup");
const { admin } = require("../ViewController");


exports.updateActiveStatus = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const _id = req.body.user_id;
    const isActive = req.body.updatedActiveStatus;

    Signup.findByIdAndUpdate(_id,{
        isActive: isActive
    },{upsert: false, new: true})
        .exec()
        .then(result => {
            if(result.isActive == isActive){
                return res.status(200).json({
                    success: true,
                    updatedIsActive: result.isActive
                })
            }else{
                return res.status(401).json({success: false, error: "Error while updating active status"})
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        })

}