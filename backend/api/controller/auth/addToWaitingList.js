const { validateAddToWaitingListSchema } = require("../requestValidator/authValidator");

const WaitingList = require("../../model/waitingList")
const Signup = require("../../model/signup")


exports.addToWaitingList = async (req, res) => {

    const result = await validateAddToWaitingListSchema(req.body);

    if(result.success){

        let user = null;
        user = await WaitingList.findOne({email: req.body.email}).exec();
        if(user){
            return res.status(409).json({
                success: false,
                error: "Email already added to waiting list!",
            })
        }

        user = await WaitingList.findOne({mobileNumber: req.body.mobileNumber}).exec();
        if(user){
            return res.status(409).json({
                success: false,
                error: "Mobile number already added to waiting list!",
            })
        }

        user = await Signup.findOne({email: req.body.email}).exec();
        if(user){
            return res.status(409).json({
                success: false,
                error: "Account with this email already exists!",
            })
        }

        user = await Signup.findOne({mobileNumber: req.body.mobileNumber}).exec();
        if(user){
            return res.status(409).json({
                success: false,
                error: "Account with this mobile number already exists",
            })
        }

        const waiting = new WaitingList({
            email: req.body.email,
            mobileNumberCountryCode: req.body.mobileNumberCountryCode,
            mobileNumber: req.body.mobileNumber,
            name: req.body.name
        });

        console.log(waiting);

        waiting.save().then(result => {
            console.log(result);

            if(result){
                return res.status(200).json({
                    success: true,
                    message: "Successfully added to waiting list"
                })
            }else{
                return res.status(500).json({
                    success: false,
                    error: "something went wrong!"
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Something went wrong!"
            })
        })
        

    }else{
        console.log(result);
        return res.status(403).json({
            success: false,
            error: "Input validation failed",
            // result: result
        });
    }

}