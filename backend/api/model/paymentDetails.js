const mongoose = require('mongoose')

const paymentDetailsSchema = new mongoose.Schema({
    qrCode: {
        type: Buffer,
        required: true
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    } 
}, {
    timestamps: true
});


module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema)