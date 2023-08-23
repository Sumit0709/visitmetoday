const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const pendingTransactionsSchema = new mongoose.Schema({
    signupId: {
        type: mongoose.Types.ObjectId,
        ref: 'Signup',
        required: true
    },
    paymentTime: {
        type: Number,
        required: true
    },
    UTRNumber: {
        type: String,
        required: true
    },
    screenshot:{
        type: Buffer,
    }

})

pendingTransactionsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('PendingTransactions', pendingTransactionsSchema)