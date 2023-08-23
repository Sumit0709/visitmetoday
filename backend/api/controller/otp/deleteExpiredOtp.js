const Otp = require("../../model/otp")


exports.deleteExpiredOtp = async (req, res) => {

    const currTimeInMill = (new Date()).getTime();

    Otp.deleteMany({
        expiryTime:{$gte: currTimeInMill} 
    }, {new: true}).exec()
        .then(result => {
            if(result){
                // console.log(result);
                console.log(`${result.deletedCount} Expired otp's deleted successfully`)
            }
            else{
                console.log("No expired document found")
            }
        })
        .catch(err=> {
            console.log("Deleting expired otp's failed")
            console.log(err);
        })

}