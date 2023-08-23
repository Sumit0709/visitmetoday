const mongoose = require("mongoose")
const Counter = require("../../model/counter")
const Signup = require("../../model/signup")
const Signin = require("../../model/signin")
const Profile = require("../../model/profile")
const UsedUrl = require("../../model/usedUrl")

const variable = require("../../../variable")
const usedUrl = require("../../model/usedUrl")

exports.updateCounter = async (req, res) => {

    const counterId = mongoose.Types.ObjectId(variable.counterId)

    const oldCounter = await Counter.findById(counterId).exec();

    if(!oldCounter){
        console.log('Error while reading old counter');
        // return res.status(401).json({
        //     success: false,
        //     error: "Error while reading old counter"
        // })
    }

    const signup = await Signup.find({}).count();
    // if(signup<oldCounter.signup){
    //     return res.status(401).json({
    //         success: false,
    //         error: "Something went wrong while counting signup"
    //     })
    // }
    // const signin = await Signin.find({}).count();
    // if(signin<oldCounter.signin){
    //     return res.status(401).json({
    //         success: false,
    //         error: "Something went wrong while counting signin"
    //     })
    // }
    const profileCreated = await Profile.find({}).count();
    // if(profileCreated<oldCounter.profileCreated){
    //     return res.status(401).json({
    //         success: false,
    //         error: "Something went wrong while counting profileCreated"
    //     })
    // }

    let profileVisited = 0;

    for await (const usedUrlInstance of UsedUrl.find()){
        profileVisited = profileVisited + usedUrlInstance.visitCounter;
    }
    
    // if(profileVisited<oldCounter.profileVisited){
    //     return res.status(401).json({
    //         success: false,
    //         error: "Something went wrong while counting profileVisited"
    //     })
    // }

    Counter.findByIdAndUpdate(counterId, {
        signup: signup,
        signin: 0,/*signin,*/
        profileCreated: profileCreated,
        profileVisited: profileVisited
    },{upsert: false, new: true}).exec()
    .then(result => {
        if(result){
            console.log("Counter updated successfully");
            // return res.status(200).json({
            //     success: true,
            //     message: "Counter updated successfully",
            //     result: result
            // })
        }else{
            console.log("Counter updation failed")
            // return res.status(401).json({
            //     success: false,
            //     error: "Something went wrong while updating counter"
            // })
        }
    })
    .catch(err => {
        console.log(err.message)
        // return res.status(401).json({
        //     success: false,
        //     error: err.message
        // })
    })
}