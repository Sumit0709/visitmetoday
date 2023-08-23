const multer  = require('multer')
const fs = require('fs')

const Profile = require("../../model/profile");
const Signup = require("../../model/signup");
const AvailableUrl = require("../../model/availableUrl")
const UsedUrl = require("../../model/usedUrl")

const { validateBasicProfile, validateExtendedProfile, isValidFirstName, isValidMiddleName, isValidLastName } = require("../requestValidator/profileValidator")

const {allUser} = require("../ViewController")

const variable = require("../../../variable")
// const user = require('../../../media/user.png')

const updateSigupWithProfileId = async(signupId,profileId) => {
    return Signup.findByIdAndUpdate(signupId, {profileId: profileId})
        .exec()
        .then(result => {
            if(result){
                console.log("updateSigupWithProfileId successfull");
            }
            else{
                console.log("updateSigupWithProfileId failed");
            }
        })
        .catch(err => {
            console.log("updateSigupWithProfileId failed in catch")
            console.log(err)
        })
}

const updateProfileUrl = async(profileId) => {

    // get any random available url
    const availableUrl = await AvailableUrl.aggregate([{$sample:{size:1}}]);
    const availableUrlId = availableUrl[0]._id;
    const availableUrlValue = availableUrl[0].url;

    // deleting url from available database
    return AvailableUrl.findByIdAndDelete(availableUrlId)
        .exec()
        .then(deletedUrl => {
            if(deletedUrl){
                // url deleted successfully
                // console.log("Avaialable Urls ");
                // console.log(availableUrl);
                // console.log(availableUrlId, availableUrlValue);

                const newUrl = new UsedUrl({
                    url: availableUrlValue,
                    profileId: profileId
                });

                newUrl.save()
                    .then(savedUrl => {
                        if(savedUrl){
                            // url has been successfully saved and alloted to user
                            // now save it's reference in user's profile

                            // console.log("SAVED URL ID", savedUrl._id);

                            Profile.findByIdAndUpdate(profileId,{profileUrl: savedUrl._id})
                                .exec()
                                .then(updatedProfile => {
                                    if(updatedProfile){
                                        // everything finished successfully
                                        console.log("Url has been successfully alloted to the profile")
                                    }
                                    else{
                                        console.log("Error in updating Profile")
                                    }
                                })
                                .catch(err => {
                                    console.log("Error in updating Profile -> in catch")
                                    console.log(err.message)
                                })

                        }else{
                            // url has not been saved
                            console.log("Error in saving url in usedUrl collection")
                        }
                    })
            }
            else{
                console.log("URL not deleted from available list, so can't assign to new profile")
            }
        })
        .catch(err => {
            console.log("Error in deleting URL from available url collection -> in ctach")
        })

}


exports.createProfile = async (req, res, next) => {

    const user = req.body.user;
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }
    // console.log(user);
    const signupId = user._id;
    // console.log(parseInt(req.headers["content-length"]));

    const storage = multer.memoryStorage();
    const myFileFilter = (req, file, cb) => {

        const allowedMIME = variable.validFileMIMEType;
        if(allowedMIME.includes(file.mimetype)){
            return cb(null, true)
        }
        console.log("DID'T MATCH")
        return cb({
            success: false,
            error: "Invalid mime type"
        }, false)
    }
    const upload = multer({
        storage: storage, 
        // fileFilter: myFileFilter,
        // limits: {
        //     fileSize: variable.maxFileSizeInBytes,  
        // },
    }).none()
    // .single("photo");


    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError){

            if (err.code == 'LIMIT_FILE_SIZE') {
                return res.status(401).json({
                    success: false,
                    error: 'File Size is too large',
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    error: err
                })
            }
        }
        else if(err){
            return res.status(401).json({
                success: false,
                error: err.message,
                message: "Something went wrong while uploading file"
            })
        }
        // commented as we are using dummy user image

        // else if(!req.file){
        //     return res.status(401).json({
        //         success: false,
        //         error: "File missing"
        //     })
        // }

        

        // console.log(req.file);
        // return res.status(401).json({
        //     success: false,
        //     error: 'good'
        // })
        const result1 = await validateBasicProfile(req.body);
        // const result2 = await validateExtendedProfile(req.body);
        let isErrorFound = false;
        if(!isValidFirstName(req.body.firstName.trim())){
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

        if(!result1.success || isErrorFound){
            return res.status(401).json({
                success: false,
                error: "Invalid input",
                // message: result1
            })
        }else{
            // console.log(__dirname);
            // console.log(`${__dirname}/../../../media/user.png`);

            fs.readFile(`${__dirname}/../../../media/user.png`,(err, data) => {
                if(err){
                    return res.status(401).json({
                        success: false,
                        error: 'something went wrong!'
                    })
                }
                else{
            
            // return res.json({message: "DONE"});

            // check if profile already exists 
            Profile.findOne({signupId: signupId})
                .exec()
                .then(async (result) => {
                    if(result){
                        // Profile already exists
                        return res.status(200).json({
                            success: true,
                            error: "Profile already exist."
                        })
                    }
                    else{
                        // Profile doesn't exist, so create new profile

                        const profile = new Profile({
                            signupId: signupId,
                            firstName: req.body.firstName.trim(),
                            middleName: req.body.middleName? req.body.middleName.trim(): "",
                            lastName: req.body.lastName? req.body.lastName.trim(): "",
                            photo: data, //req.file.buffer,
                            gender: req.body.gender,
                            age: req.body.age,
                            ageInsertedAt: Date.now(),
                            country: req.body.country,
                            motto: req.body.motto? req.body.motto: "",
                            personality: req.body.personality? req.body.personality: "",
                        })

                        profile.save()
                            .then(async result => { 
                                if(result){
                                    // profile has been created successfully

                                    // assign a url to the profile
                                    await updateProfileUrl(result._id)
                                    // update Signup to insert profileId into the signup document
                                    await updateSigupWithProfileId(signupId,result._id);
                                    
                                    // result.photo= undefined
                                    // req.body.createdProfile = result;
                                    // next();

                                    return res.status(200).json({
                                        success: true,
                                        // result: result
                                    })
                                }
                                else{
                                    return res.status(401).json({
                                        success: false,
                                        error: "Profile creation failed"
                                    })
                                }
                            })
                            .catch(err=> {
                                console.log(err)
                                return res.status(401).json({
                                    success: false,
                                    error: 'something went wrong!'
                                })
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                    return res.status(401).json({
                        success: false,
                        error: 'something went wrong!'
                    })
                })
            } // fs
        }) // fs
        }
    })
}