const mongoose = require('mongoose')
const variable = require('../../variable')

const referalCodeSchema = new mongoose.Schema({
    signupId: {
        type: mongoose.Types.ObjectId,
        ref: 'Signup',
        unique: true
    },
    referalCodeValue: {
        type: String,
        unique: true,
        required: true
    },
    remainingReferals: {
        type: Number,
        default: 200 
        // variable.defaultRemainingReferals
    },
    referedBy: {
        type: String,
        required: true
    },
    referedTo: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("ReferalCode", referalCodeSchema);