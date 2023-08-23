const Signup = require("../../model/signup");
const Verification = require("../../model/verification");
const { admin } = require("../ViewController");


exports.updateVerification = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const userId = req.params.userId;

    const user = await Signup.findById(userId).exec();

    if(!user){
        return res.status(404).json({
            success: false,
            error: "User not found"
        })
    }

    const verificationId = user.verificationId;

    const update = req.body.updatedVerification;

    Verification.findByIdAndUpdate(verificationId, update, {upsert: false, new: true})
        .exec()
        .then(result => {
            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Verification document successfully updated!'
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "Verification Document update failed"
                })
            }
        })
        .catch(err=> {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        })

}