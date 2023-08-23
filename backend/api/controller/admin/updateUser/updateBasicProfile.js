const Profile = require("../../../model/profile");
const Signup = require("../../../model/signup");
const { validateBasicProfileDuringUpdate, isValidFirstName, isValidMiddleName, isValidLastName } = require("../../requestValidator/profileValidator");
const { admin } = require("../../ViewController");


exports.updateBasicProfile = async(req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    // console.log(req.body);

    const result = await validateBasicProfileDuringUpdate(req.body);

    let isErrorFound = false;
    if(req.body.firstName && !isValidFirstName(req.body.firstName.trim())){
        isErrorFound = true;
        // errorObject = {...errorObject, firstNameError: 'first name should be 2-20 char long'}
    }
    if(req.body.middleName && !isValidMiddleName(req.body.middleName.trim())){
        isErrorFound = true;
        // errorObject = {...errorObject, middleNameError: 'middle name should be 2-20 char long'}
    }
    if(req.body.lastName && !isValidLastName(req.body.lastName.trim())){
        isErrorFound = true;
        // errorObject = {...errorObject, lastNameError: 'last name should be 2-20 char long'}
    }

    if(!result.success || isErrorFound){
        // console.log(result)
        return res.status(401).json({
            success: false,
            error: "Invalid input"
        })
    }else{

        const userId = req.params.userId;
        const user = await Signup.findById(userId).exec();
        if(!user){
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        const profileId = user.profileId;

        let updates = {};
        
        if(req.body.firstName) updates = {...updates, firstName: req.body.firstName}
        if(req.body.middleName!=null) updates = {...updates, middleName: req.body.middleName}
        if(req.body.lastName!=null) updates = {...updates, lastName: req.body.lastName}
        if(req.body.gender) updates = {...updates, gender: req.body.gender}
        if(req.body.age) updates = {...updates, age: req.body.age}
        if(req.body.country) updates = {...updates, country: req.body.country}
        if(req.body.motto!=null) updates = {...updates, motto: req.body.motto}
        if(req.body.personality!=null) updates = {...updates, personality: req.body.personality}


        Profile.findByIdAndUpdate(profileId,updates,{new: true, upsert: false}).exec()
        .then(result => {
            
            if(result){
                    return res.status(200).json({
                        success: true,
                        message: 'Done'
                    })
                }
                else{
                    return res.status(401).json({
                        success: false,
                        error: 'Document NOT Updated'
                    })
                }
            })
            .catch(err => {

                return res.status(500).json({
                    success: false,
                    error: err.messsage
                })
            })


        

    }

}