const otpGenerator = require("otp-generator");

const variable = require("../../../variable");
const Otp = require("../../model/otp");

const {allUser} = require('../ViewController')

const newOtp = (req, res) => {

    // OTP Value (5 char, only Numeric value)
    const otpValue = otpGenerator.generate(5, { lowerCaseAlphabets: false, upperCaseAlphabets : false, specialChars: false });
    
    // user attached with req.body
    const user = req.body.user;
    
    // creating new Otp instance
    const otp = new Otp({
        signupId: user._id,
        otpValue: otpValue,
        for: variable.otpForForgotPassword,
        createdAt: new Date()
    });

    // saving otp instance
    otp.save()
        .then(result => {
            if(result){
                // otp has successfully been created and stored in out database
                console.log("OTP has been created successfully");
                console.log("OTP = " + otpValue);
                return res.status(200).json({
                    success: true
                })
            }else{
                // otp was not stored into the database
                console.log("Otp creation failed")
                return res.status(500).json({
                    success: false,
                    error: err
                })
            }
        })
        .catch(err => {
            console.log("Otp creation failed 2")
            return res.status(500).json({
                success: false,
                error: err
            })
        })
}

exports.otpForForgetPassword = async (req, res) => {
    const user = req.body.user;

    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // check if there is already an OTP for this "for" function into our database
    Otp.findOne({
        signupId: user._id,
        for: variable.otpForForgotPassword
    }).then(result => {
        if(!result || result == null){
            // There is no OTP present into the database, so simply create a new otp 
            console.log("GENERATE OTP");
            newOtp(req, res);
        }
        else{
            // OTP was created and it has not expired
            console.log("OTP ALREADY EXIST");

            console.log("OTP = " + result.otpValue);
            return res.status(200).json({
                success: true
            })

            // Otp.findById(result._id).then(deletedOtp => {
            //     if(deletedOtp){
            //         // OTP deleted successfully
            //         newOtp(req, res);
            //     }
            //     else{
            //         // We encountered some problem while deleting existing otp 
            //         return res.status(500).json({
            //             success: false,
            //             error: err
            //         })
            //     }
            // })
            // .catch(err => {
            //     return res.status(500).json({
            //         success: false,
            //         error: err
            //     })
            // })
        }
    })
    .catch(err => {
        console.log("Otp creation failed 3")
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err
        })
    })
}