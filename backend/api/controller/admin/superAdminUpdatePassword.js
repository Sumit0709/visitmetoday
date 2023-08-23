const bcrypt = require("bcrypt")

const Signup = require("../../model/signup");
const {validPassword} = require("../requestValidator/authValidator")

const variable = require("../../../variable")

const {superAdmin} = require("../ViewController")

exports.superAdminUpdatePassword = async (req, res) => {

    // Controller for view
    const viewResult = superAdmin(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // Check is new password is valid or not
    const isValidPassword = validPassword(req.body.newPassword);
    if(!isValidPassword){
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }

    const user = req.body.user;
    const customer = req.body.customer;
    
    // creating hash of new password
    bcrypt.hash(req.body.newPassword, variable.salt, (err, hash) => {
        if(err){
            return res.status(401).json({
                success:false,
                error: err
            })
        }

        // update password into the databse
        Signup.findByIdAndUpdate(customer._id, {password: hash})
        .then(result => {
            if(result){
                return res.status(200).json({
                    status: true,
                    message: "Password has been changed successfully"
                })
            }else{
                return res.status(401).json({
                    success: false,
                    error: err.message
                })
            }
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                error: err.message
            })
        })
    })
}