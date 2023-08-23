const bcrypt = require("bcrypt")

const Signup = require("../../model/signup");
const {validPassword} = require("../requestValidator/authValidator")

const variable = require("../../../variable")

const {allUser} = require("../ViewController")

exports.updatePassword = async (req, res) => {

    // Check is new password is valid or not
    const isValidPassword = validPassword(req.body.newPassword) && (req.body.newPassword==req.body.confirmNewPassword);
    if(!isValidPassword){
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }

    const user = req.body.user;
    
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }
    
    // creating hash of new password
    bcrypt.hash(req.body.newPassword, variable.salt, (err, hash) => {
        if(err){
            return res.status(401).json({
                success:false,
                error: err
            })
        }

        // update password into the databse
        Signup.findByIdAndUpdate(user._id, {password: hash},{upsert: false, new:true})
        .then(result => {
            if(result){
                return res.status(200).json({
                    success: true,
                    message: "Password has been changed successfully"
                })
            }else{
                return res.status(401).json({
                    success: false,
                    error: "Password Update Failed"
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Something went wrong"
            })
        })
    })
}