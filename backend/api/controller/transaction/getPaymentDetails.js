const paymentDetails = require("../../model/paymentDetails")


exports.getPaymentDetails = async (req, res) => {
    

    paymentDetails.find({}).exec()
        .then(result => {
            if(result.length == 1){
                // all good
                // console.log(result[0]);
                return res.status(200).json({
                    success: true,
                    upiId: result[0].upiId,
                    mobileNumber: result[0].mobileNumber,
                    name: result[0].name,
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: "something went wrong, please contact admin!" 
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: "something went wrong, please refresh the page and try again!" 
            })
        })
    
    
}