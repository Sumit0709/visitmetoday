const Signup = require("../../model/signup");
const Profile = require("../../model/profile");
const Verification = require("../../model/verification");
const Transaction = require("../../model/transactions");
const ReferalCode = require("../../model/referalCode");
const Signin = require("../../model/signin");
const UsedUrl = require("../../model/usedUrl");


const { superAdmin } = require("../ViewController");

exports.deleteUser = async (req, res) => {

    const viewResult = superAdmin(req, res);
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

    const profileId = user.profileId;
    const verificationId = user.verificationId;
    const transactionId = user.transactionId;
    const referalCode = user.referalCode;

    let message = "";

    await ReferalCode.findOneAndDelete(referalCode).exec()
        .then(res => {
            if(res){
                message += "Referal code deleted successfully\n";
            }
            else{
                message += "Referal code not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })

    await Transaction.findByIdAndDelete(transactionId).exec()
        .then(res => {
            if(res){
                message += "Transaction deleted successfully\n";
            }
            else{
                message += "Transaction not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })

    await Verification.findByIdAndDelete(verificationId).exec()
        .then(res => {
            if(res){
                message += "Verification deleted successfully\n";
            }
            else{
                message += "Verification not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })
    
    await UsedUrl.deleteMany({profileId: profileId},{new: true}).exec()
        .then(res => {
            if(res){
                message += "Used URL deleted successfully\n";
            }
            else{
                message += "Used URL not found\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })

    await Profile.findByIdAndDelete(profileId).exec()
        .then(res => {
            if(res){
                message += "Profile deleted successfully\n";
            }
            else{
                message += "Profile not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })
    
    await Signin.deleteMany({signupId: userId}).exec()
        .then(res => {
            if(res){
                message += "Signin deleted successfully\n";
            }
            else{
                message += "Signin not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })
    
    
    await Signup.findByIdAndDelete(userId).exec()
        .then(res => {
            if(res){
                message += "Signup deleted successfully\n";
            }
            else{
                message += "Signup not present\n";
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: message
            })
        })

    
        return res.status(200).json({
            success: true,
            message: message
        })

}