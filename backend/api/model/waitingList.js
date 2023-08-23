const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const waitinglistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobileNumberCountryCode: {type: Number, default: 0, required: true},
    mobileNumber: {
        // Storing Mobile number of user that he could use for login
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

waitinglistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("WaitingList", waitinglistSchema);