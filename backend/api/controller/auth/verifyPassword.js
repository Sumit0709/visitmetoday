const Signup = require("../../model/signup");
const bcrypt = require('bcrypt')

exports.verifyPassword = async (req, res, next) => {

    const user = req.body.user;
    const password = req.body.currentPassword.trim();


    try{
        bcrypt.compare(password, user.password, (err, match) => {
            if(match){
                next();
            }
            else{
                console.log(err);
                return res.status(401).json({
                    success: false,
                    error: "Incorrect Password"
                })
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }

}