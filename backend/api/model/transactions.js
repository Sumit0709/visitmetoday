const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const transactionsSchema = new mongoose.Schema({
    signupId: {
        type: mongoose.Types.ObjectId,
        ref: 'Signup'
    },
    history: [{
        UTRNumber: {
            type: String,
        },
        startTime: {
            type: Number,
        },
        endTime: {
            type: Number
        }
    }]
})

transactionsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Transactions', transactionsSchema)