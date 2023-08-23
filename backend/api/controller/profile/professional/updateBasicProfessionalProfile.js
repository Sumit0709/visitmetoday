const multer  = require('multer')

// const Profile = require("../../model/profile");

const { validateBasicProfessionalProfileDuringUpdate } = require("../../requestValidator/profileValidator")

const {allUser} = require("../../ViewController");
const ProfessionalProfile = require('../../../model/professionalProfile');

exports.updateBasicProfessionalProfile = async (req, res,next) => {

    const user = req.body.user;
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const signupId = user._id;
    const professionalProfileId = user.professionalProfileId;


    const result = await validateBasicProfessionalProfileDuringUpdate(req.body);

    if(!result.success){
        // console.log(result)
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }else{

        let updates = {};
        // if(req.body.firstName) updates = {...updates, firstName: req.body.firstName}
        // if(req.body.middleName!=null) updates = {...updates, middleName: req.body.middleName}
        // if(req.body.lastName!=null) updates = {...updates, lastName: req.body.lastName}
        // if(req.body.gender) updates = {...updates, gender: req.body.gender}
        // if(req.body.age) updates = {...updates, age: req.body.age}
        if(req.body.country) updates = {...updates, country: req.body.country}
        if(req.body.sellOnline!=null) updates = {...updates, sellOnline: req.body.sellOnline}
        if(req.body.dealsIn!=null) updates = {...updates, dealsIn: req.body.dealsIn}
        if(req.body.servesInArea!=null) updates = {...updates, servesInArea: req.body.servesInArea}

        // console.log(updates);
        // console.log(req.body);

        ProfessionalProfile.findByIdAndUpdate(professionalProfileId,updates,{upsert: false, new: true})
            .exec()
            .then(result => {
                if(result){
                    // profile successfully updated
                    console.log("Basic Professional Profile updated Successfully");

                    // await generateSharingImageMiddleware()
                    // await GenerateSharingImage()

                    next();

                    // return res.status(200)
                    //     .json({
                    //         success: true,
                    //         message: "Basic Profile updated Successfully"
                    //     })
                }else{
                    return res.status(401).json({
                        success: false,
                        error: "Basic profile updation failed"
                    })
                }
            })
            .catch(err => {
                console.log("Basic profile updation failed");
                return res.status(401).json({
                    success: false,
                    error: err.message
                })
            })

    }
}