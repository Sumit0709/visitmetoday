const paymentDetails = require("../../model/paymentDetails")


exports.getPaymentQR = async(req, res) => {


    paymentDetails.find({}).exec()
        .then(result => {
            if(result.length == 1){
                
                res.set("Content-Type", "Image/png");
                return res.send(result[0].qrCode);

            }else{
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