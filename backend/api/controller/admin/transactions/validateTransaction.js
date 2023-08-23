const pendingTransactions = require("../../../model/pendingTransactions");
const Signup = require("../../../model/signup");
const Transactions = require("../../../model/transactions");
const { sendEmailAfterPaymentVerification } = require("../../common/sendEmailAfterPaymentVerification");


// const validTransaction = () => {

// }



exports.validateTransaction = async (req, res) => {

    const pendingTransactionId = req.body.pendingTransactionId;
    const isSuccessfullTransaction = req.body.isSuccessfullTransaction;

    console.log(pendingTransactionId);

    if(!isSuccessfullTransaction){
        // what to do for invalid transaction ?
        pendingTransactions.findById(pendingTransactionId).exec()
            .then(pendingTransactionResult => {
                if(pendingTransactionResult){
                    // pending transaction document found
                    const signupId = pendingTransactionResult.signupId;
                    const currTime = Date.now();
                    const validTill = currTime + 365*24*60*60*1000;

                    // TODO::
                    
                    Signup.findByIdAndUpdate(signupId,{isTransactionValidated: true}, {upsert: false, new: true})
                        .exec()
                        .then(async result => {
                            if(result){
                                const deletedTransaction = await pendingTransactions.findByIdAndDelete(pendingTransactionId,{new: true}).exec();
                                
                                if(deletedTransaction){
                                    return res.status(200).json({
                                        success: true,
                                        message: 'payment invalidated successfully'
                                    })   
                                }
                                else{
                                    return res.status(200).json({
                                        success: false,
                                        message: 'failed to delete pending Transaction document!'
                                    })
                                }


                                
                            }else{
                                return res.status(200).json({
                                    success: true,
                                    message: "failed to update signup document's isTransactionValidated field"
                                })
                            }
                        })
                        .catch(err => {
                            return res.status(500).json({
                                success: false, 
                                error: 'something went wrong while wpdating signup document '
                            })
                        })
                }
                else{
                    return res.status(401).json({
                        success: false, 
                        error: 'pending transaction document not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    success: false, 
                    error: 'something went wrong while finding pending transaction document '
                })
            })
    }
    else{
        pendingTransactions.findById(pendingTransactionId).exec()
            .then(pendingTransactionResult => {
                if(pendingTransactionResult){
                    // pending transaction document found
                    const signupId = pendingTransactionResult.signupId;
                    const currTime = Date.now();
                    const validTill = currTime + 365*24*60*60*1000;

                    Signup.findByIdAndUpdate(signupId,{
                        transactionValidTill: validTill,
                        isTransactionValidated: true,
                    },{new: true, upsert: false}).exec()
                        .then(async user => {
                            if(user){

                                // SEND EMAIL STATING THAT HIS/HER ACCOUNT HAS BEEN ACTIVATED

                                // const isEmailSent = await sendEmailAfterPaymentVerification({
                                //     to_name: 'User',
                                //     to_email: user.email,
                                //     sender_name: process.env.SENDER_NAME,
                                //     sender_email: process.env.SENDER_EMAIL,
                                // })

                                // if(!isEmailSent.success){
                                //     return res.status(401).json({
                                //         success: false,
                                //         error: 'User account activated, but email not sent to user.'
                                //     })
                                // }

                                // user is found and updated
                                // console.log(user);
                                const transactionId = user.transactionId;
                                // console.log(transactionId);

                                Transactions.findByIdAndUpdate(transactionId,{
                                    $push: {
                                        history: {
                                            UTRNumber: pendingTransactionResult.UTRNumber,
                                            startTime: currTime,
                                            endTime: validTill
                                        }
                                    }
                                },{
                                    new: true
                                }).exec()
                                .then(transactionResult => {
                                    // transaction has been updated successfully
                                    if(transactionResult){


                                        pendingTransactions.findByIdAndDelete(pendingTransactionId).exec()
                                            .then(ptr => {
                                                if(ptr){
                                                    return res.status(200).json({
                                                        success: true,
                                                        message: 'payment verified successfully.'
                                                    })
                                                }else{
                                                    return res.status(401).json({
                                                        success: false,
                                                        error: 'error in deleting pending Transactions.'
                                                    })
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                return res.status(500).json({
                                                    success: false, 
                                                    error: 'something went wrong'
                                                })
                                            })


                                        
                                    }else{
                                        return res.status(401).json({
                                            success: false, 
                                            error: 'something went wrong while updating Transaction'
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({
                                        success: false, 
                                        error: 'something went wrong while updating Transaction'
                                    })
                                })

                            }
                            else{
                                return res.status(401).json({
                                    success: false, 
                                    error: 'user document not found!'
                                })
                            }
                        })
                        .catch(err => {
                            return res.status(500).json({
                                success: false, 
                                error: 'something went wrong while updating user'
                            })
                        })

                }else{

                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    success: false, 
                    error: 'something went wrong'
                })
            })
        }

}