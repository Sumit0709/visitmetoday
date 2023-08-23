const otpGenerator = require('otp-generator')

const Otp = require("../../model/otp");
const { allUser } = require("../ViewController");
const variable = require("../../../variable")

const generateNewOtp = (req, res) => {

    // OTP Value (5 char, only Numeric value)
    const otpValue = otpGenerator.generate(5, { lowerCaseAlphabets: false, upperCaseAlphabets : false, specialChars: false });
    const validForMin = 5;
    const validFor = 300000

    // user attached with req.body
    const user = req.body.user;
    const indexOfOtp = req.body.otpFor;
    const otpFor = indexOfOtp;

    const currTime = Date.now();
    // const expiryTime = new Date(currTime.getTime() + validForMin*60000)
    const expiryTime = (currTime + validFor)

    // creating new Otp instance
    const newOtp = new Otp({
        signupId: user._id,
        otpValue: otpValue,
        for: otpFor,
        expiryTime: expiryTime
    });

    newOtp.save()
        .then(result => {
            if(result){
                // New Otp generated Successfully
                req.otpValue = result.otpValue
                // call sendOtp(req, res)
                console.log("NEW OTP VALUE ", result.otpValue)
                return res.status(200).json({
                    success: true,
                    message: "Otp has been sent to your registered email"
                })
            }else{
                return res.status(401).json({
                    success: false, 
                    error: "Error in generating OTP"
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
}













exports.generateOtp = async (req, res) => {

    const userId = req.body.user._id;
    const indexOfOtp = req.body.otpFor;

    if(indexOfOtp == null || indexOfOtp<0 || indexOfOtp>2){
        return res.status(401).json({
            success: false,
            error: "Invalid request, Please make a valid request."
        })
    }

    const otpFor = indexOfOtp; // we can change this value from same as index to unique value (like for admin and super admin)
    
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    Otp.findOne({
        signupId: userId,
        for: otpFor
    }).exec()
    .then(result => {
        if(result){
            // OTP has already been generated
            
            // const isOtpExpired = currTime.getTime() > result.expiryTime.getTime();
            const currTime = Date.now();
            const isOtpExpired = currTime > result.expiryTime;

            if(isOtpExpired){
                // Generate New OTP
                Otp.findByIdAndDelete(result._id,{new: true}).exec()
                    .then(otpDeleted => {
                        if(otpDeleted){
                            generateNewOtp(req, res)
                        }
                        else{
                            return res.status(500).json({
                                success: false,
                                error: "Something went wrong"
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
                
            }
            else{
                // Return this OTP
                req.otpValue = result.otpValue;
                // call sendOTP(req, res)
                
                console.log("EXISTIMG OTP VALUE ", result.otpValue);
                return res.status(200).json({
                    success: true,
                    message: "Otp has been sent to your registered email"
                });
            }
        }else{
            // Generate New OTP
            generateNewOtp(req, res)
        }   
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    })

}