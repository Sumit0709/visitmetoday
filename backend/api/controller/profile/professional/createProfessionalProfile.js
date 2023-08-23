const multer  = require('multer')
const fs = require('fs')

const Profile = require('../../../model/profile');
const ProfessionalProfile = require('../../../model/professionalProfile');
const Signup = require("../../../model/signup");
const AvailableUrl = require("../../../model/availableUrl")
const UsedUrl = require("../../../model/usedUrl")

const { validateBasicProfessionalProfile, validateExtendedProfile, isValidCompanyFirstName, isValidCompanyMiddleName, isValidCompanyLastName } = require("../../requestValidator/profileValidator")

const {allUser} = require("../../ViewController")
const variable = require("../../../../variable");
const ProfessionalUsedUrl = require('../../../model/professionalUsedUrl');
// const user = require('../../../media/user.png')

const updateSigupWithProfessionalProfileId = async(signupId,professionalProfileId) => {
    return Signup.findByIdAndUpdate(signupId, {professionalProfileId: professionalProfileId})
        .exec()
        .then(result => {
            if(result){
                console.log("updateSigupWith ProfessionalProfileId successfull");
            }
            else{
                console.log("updateSigupWith ProfessionalProfileId failed");
            }
        })
        .catch(err => {
            console.log("updateSigupWith ProfessionalProfileId failed in catch")
            console.log(err)
        })
}

const updateProfessionalProfileUrl = async(professionalProfileId) => {

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

                const newProfessionalUrl = new ProfessionalUsedUrl({
                    url: availableUrlValue,
                    professionalProfileId: professionalProfileId
                });

                newProfessionalUrl.save()
                    .then(savedUrl => {
                        if(savedUrl){
                            // url has been successfully saved and alloted to user
                            // now save it's reference in user's profile

                            // console.log("SAVED URL ID", savedUrl._id);

                            ProfessionalProfile.findByIdAndUpdate(professionalProfileId,{professionalProfileUrl: savedUrl._id})
                                .exec()
                                .then(updatedProfile => {
                                    if(updatedProfile){
                                        // everything finished successfully
                                        console.log("Url has been successfully alloted to the professional profile")
                                    }
                                    else{
                                        console.log("Error in updating professional Profile")
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

// const updateProfessionalProfileUrl = async(profileUrlId, professionalProfileId) => {

//     // get any random available url
//     const availableUrl = await AvailableUrl.aggregate([{$sample:{size:1}}]);
//     const availableUrlId = availableUrl[0]._id;
//     const availableUrlValue = availableUrl[0].url;

//     // deleting url from available database
//     return AvailableUrl.findByIdAndDelete(availableUrlId)
//         .exec()
//         .then(deletedUrl => {
//             if(deletedUrl){
//                 // url deleted successfully
//                 // console.log("Avaialable Urls ");
//                 // console.log(availableUrl);
//                 // console.log(availableUrlId, availableUrlValue);

//                 UsedUrl.findByIdAndUpdate(profileUrlId,{
//                     professionalProfileId: professionalProfileId
//                 },{upsert: false, new: true}).exec()
//                     .then(updatedUrl => {
//                         if(updatedUrl){
                            
//                             ProfessionalProfile.findByIdAndUpdate(professionalProfileId, {
//                                 professionalProfileUrl: updatedUrl._id
//                             }).exec()
//                             .then(updatedProfessionalProfile => {
//                                 if(updatedProfessionalProfile){
//                                     // everything finished successfully
//                                     console.log("Url has been successfully alloted to the professional profile")
//                                 }
//                                 else{
//                                     console.log("Error in updating ProfessionalProfile")
//                                 }
//                             })
//                             .catch(err => {
//                                 console.log("Error in updating ProfessionalProfile :: IN CATCH :: ERR :: ", err.message)
//                             })
//                         }
//                         else{
//                             console.log("Error in updating url in usedUrl collection for professional profile")
//                         }
//                     })
//                     .catch(err => {
//                         console.log("Error in updating url in usedUrl collection for professional profile :: IN CATCH :: ERR :: ", err.message)
//                     })
//             }
//             else{
//                 console.log("URL not deleted from available list, so can't assign to new profile")
//             }
//         })
//         .catch(err => {
//             console.log("Error in deleting URL from available url collection -> in ctach")
//         })

// }


exports.createProfessionalProfile = async (req, res, next) => {

    const user = req.body.user;
    // Controller for view
    const viewResult = allUser(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }
    // console.log(user);
    const signupId = user._id;
    // const profile = await Profile.findById(user.profileId).exec();
    // if(!profile){
    //     return res.status(500).json({
    //         success: false,
    //         error: "Profile Not Found!"
    //     })
    // }
    // const usedUrlId = profile.profileUrl;
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

        // console.log(req.body);
        
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

        const result1 = await validateBasicProfessionalProfile(req.body);
        // const result2 = await validateExtendedProfile(req.body);
        let isErrorFound = false;
        if(!isValidCompanyFirstName(req.body.companyFirstName.trim())){
            isErrorFound = true;
            // errorObject = {...errorObject, firstNameError: 'first name should be 2-20 char long'}
        }
        if(req.body.companyMiddleName && !isValidCompanyMiddleName(req.body.companyMiddleName.trim())){
            isErrorFound = true;
            // errorObject = {...errorObject, middleNameError: 'middle name should be 2-20 char long'}
        }
        if(req.body.companyLastName && !isValidCompanyLastName(req.body.companyLastName.trim())){
            isErrorFound = true;
            // errorObject = {...errorObject, lastNameError: 'last name should be 2-20 char long'}
        }

        if(!result1.success || isErrorFound){
            return res.status(401).json({
                success: false,
                error: "Invalid input",
                message: result1
            })
        }else{
            // console.log(__dirname);
            // console.log(`${__dirname}/../../../media/user.png`);

            fs.readFile(`${__dirname}/../../../../media/user.png`,(err, data) => {
                if(err){
                    return res.status(401).json({
                        success: false,
                        error: 'something went wrong!'
                    })
                }
                else{
            
            // return res.json({message: "DONE"});

            // check if profile already exists 
            ProfessionalProfile.findOne({signupId: signupId})
                .exec()
                .then(async (result) => {
                    if(result){
                        // Profile already exists
                        return res.status(200).json({
                            success: true,
                            error: "Professional Profile already exist."
                        })
                    }
                    else{
                        // Profile doesn't exist, so create new profile

                        const professionalProfile = new ProfessionalProfile({
                            signupId: signupId,
                            companyFirstName: req.body.companyFirstName.trim(),
                            companyMiddleName: req.body.companyMiddleName? req.body.companyMiddleName.trim(): "",
                            companyLastName: req.body.companyLastName? req.body.companyLastName.trim(): "",
                            photo: data, //req.file.buffer,
                            sellOnline: req.body.sellOnline,
                            since: req.body.since,
                            // sinceInsertedAt: Date.now(),
                            country: req.body.country,
                            dealsIn: req.body.dealsIn? req.body.dealsIn: "",
                            servesInArea: req.body.servesInArea? req.body.servesInArea: "",
                        })
                        
                        // return res.status(400).json({
                        //     success: false,
                        //     error: 'TRIAL'
                        // })

                        professionalProfile.save()
                            .then(async result => { 
                                if(result){
                                    // profile has been created successfully

                                    // assign a url to the profile
                                    await updateProfessionalProfileUrl(result._id)
                                    // update Signup to insert profileId into the signup document
                                    await updateSigupWithProfessionalProfileId(signupId,result._id);
                                    
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