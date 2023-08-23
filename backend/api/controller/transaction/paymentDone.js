const pendingTransaction = require("../../model/pendingTransactions");
const Signup = require("../../model/signup");
const Transactions = require("../../model/transactions");
const { sendEmailForPaymentReceived } = require("../common/sendEmailForPaymentReceived");

const completeTransaction = (req, res, paymentDetails, user_email) => {
    const pTransaction = new pendingTransaction(paymentDetails)

    // console.log('sabsagfsdaf')

    pTransaction.save()
        .then(async result => {
            if(result){

                // const isEmailSent = await sendEmailForPaymentReceived({
                //     to_name: 'User',
                //     to_email: user_email,
                //     sender_name: process.env.SENDER_NAME,
                //     sender_email: process.env.SENDER_EMAIL,
                //     amount: '100'
                // })

                // console.log(isEmailSent)

                // if(isEmailSent.success){
                    return res.status(200).json({
                        success: true,
                        message: "Your transaction has been recorded."
                        //"We have sent an email to your registered email address confirming receipt of your payment. If you haven't received it, please check your spam folder."
                    })
                // }
                // else{
                //     return res.status(401).json({
                //         success: false,
                //         error: 'something went wrong, please retry!'
                //     })
                // }

            }else{
                return res.status(401).json({
                    success: false,
                    error: 'something went wrong, please retry!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                success: false,
                error: 'something went wrong, please retry!'
            })
        })
}


exports.paymentDone = async(req, res) => {

    // TODO:: validate input 
    const currTime = Date.now();

    const num = ['1','2','3','4','5','6','7','8','9','0'];
    const UTRNumber = req.body.UTRNumber;

    if(UTRNumber.length != 12){
        return res.status(401).json({
            success: false, 
            error: 'Invalid UTR Number! It should be a combination of 12 digits'
        });
    }

    for(let i=0; i<12; i++){
        if(!num.includes(UTRNumber[i])){
            return res.status(401).json({
                success: false, 
                error: 'Invalid UTR Number! It should be a combination of 12 digits'
            });
        }
    }
    

    const paymentDetails = {
        signupId: req.body.user._id,
        paymentTime: currTime,
        UTRNumber: req.body.UTRNumber,   
    }

    // make sure transaction document for this user exists before confirming payment

    Signup.findById(req.body.user._id).exec()
        .then(result => {
            if(result.transactionId){
                completeTransaction(req, res,paymentDetails, req.body.user.email);
            }
            else{
                const transactions = new Transactions({signupId: req.body.user._id});

                transactions.save()
                    .then(result => {
                        if(result){
                            Signup.findByIdAndUpdate(req.body.user._id,{
                                transactionId: result._id
                            },{new: true, upsert: false})
                            .exec()
                            .then(updatedSignup => {
                                if(updatedSignup){
                                    completeTransaction(req, res,paymentDetails, req.body.user.email);
                                }
                                else{
                                    return res.status(401).json({
                                        success: false,
                                        error: 'something went wrong, please retry!'
                                    })
                                }
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    success: false,
                                    error: 'something went wrong, please retry!'
                                })
                            })
                            
                        }else{
                            return res.status(401).json({
                                success: false,
                                error: 'something went wrong, please retry!'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(401).json({
                            success: false,
                            error: 'something went wrong, please retry!'
                        })
                    })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: 'something went wrong!'
            })
        })

    

}