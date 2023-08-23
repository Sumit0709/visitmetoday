const Counter = require("../../model/counter")
const variable = require("../../../variable")


exports.geCounter = async(req, res) => {


    const counter = (await Counter.find({}).exec())[0];

    const {signup, signin, profileCreated, profileVisited, extendedProfiles, totalActiveTime, averageActiveTime} = counter

    const response = {
        signup: counter.signup,
        profileCreated: counter.profileCreated,
        profileVisited: counter.profileVisited,
    }

    return res.status(200).json({
        success: true, 
        counter: response
    })
}