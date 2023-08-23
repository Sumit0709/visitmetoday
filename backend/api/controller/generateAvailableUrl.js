const { default: mongoose } = require('mongoose');
const { customAlphabet } = require('nanoid')
const AvailableUrl = require("../model/availableUrl")
const UsedUrl = require("../model/usedUrl") 

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const nanoid = customAlphabet(alphabet, 6);

exports.generateAvailableUrl = async (req, res) => {

    const numberOfUrlToGenerate = 500;

    const remainingAvailableUrl = await AvailableUrl.find({}).count();
    if(remainingAvailableUrl > 1000){
        console.log('More than 1000 url remaining')
        return;
    }
    // req.body.numberOfUrlToGenerate;
    console.log("IN", numberOfUrlToGenerate);

    for(let i=0; i<numberOfUrlToGenerate; i=i+1){
        
        const url = nanoid();
        await UsedUrl.findOne({url: url})
            .exec()
            .then(result=> {
                if(result){
                    // url already exists, create new one
                    console.log("URL already created and is currently under use");
                }
                else{
                    // Url doesn't exist, create new
                    const newUrl = new AvailableUrl({url: url});

                    newUrl.save()
                        .then(result => {
                            if(result){
                                console.log(i+1, " URL created successfully");
                                // i = i+1;
                            }
                            else{
                                console.log("Url creation failed")
                            }
                        })
                        .catch(err => {
                            console.log(err.message);
                        })   
                }
            })
            .catch(err => {
                console.log("Error while searching url - In Catch")
            })
    }

    // return res.status(200).json({
    //     success: true,
    //     message: "URL creation successfull"
    // })

}