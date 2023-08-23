const Joi = require("joi");
const Signup = require("../../model/signup");

const {validateGetUser} = require("../requestValidator/authValidator")

exports.getUserByEmailOrMobile = async (req, res, next) => {

    const emailOrMobile = req.body.emailOrMobile;
    
    const result = await validateGetUser(req.body);

    if(!result.success){
        console.log(result)
        return res.status(403).json({
            ...result,  
            message: "Invaid Input"
        });
    }

    // Check if its mobile number or email Id
    let isEmail = false

    const emailSchema = Joi.object({
        emailOrMobile: Joi.string().trim().lowercase().email()
    })

    try{
        await emailSchema.validateAsync(req.body, {abortEarly:false, allowUnknown: true})
        isEmail = true;
    }
    catch(err){
        isEmail = false;
    }


    var user;
    if(isEmail){
        // search for user details against email
        user = await Signup.findOne({email: emailOrMobile});
    }else{
        // search for user details against mobileNumber
        user = await Signup.findOne({mobileNumber: emailOrMobile});
        
    }

    if(!user || user == null){
        return res.status(409).json({
            success: false,
            error: "User doesnot exist",
        })
    }
    else if(user.isActive == false){
        // user has deleted their account
        return res.status(409).json({
            success: false,
            error: "Account is not active, Please contact Admin."
        })
    }
    else{
        // user has been successfully found and is attached into the req.body as req.body.user
        req.body.user = user;
        next();
    }

}