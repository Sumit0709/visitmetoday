const Counter = require("../../model/counter")
const variable = require("../../../variable")

const {superAdmin} = require("../ViewController")

exports.createCounter = async(req, res) => {

    const user = req.body.user;
    // Controller for view
    const viewResult = superAdmin(req,res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const existingCounter = await Counter.find({}).exec();
    
    if(existingCounter[0]){
        return res.status(401).json({
            success: false,
            error: "Counter already exist"
        })
    }

    const newCounter = new Counter({});

    console.log(newCounter);

    newCounter.save()
        .then(result => {
            if(result){
                // counter created Successfully
                console.log(result);
                console.log(result._id);
                return res.status(200).json({
                    success: true,
                })
            }
            else{
                console.log("Something went wrong while creating new counter instance")
                return res.status(401).json({
                    success: false,
                    error: "Something went wrong"
                })
            }
        })
        .catch(err => {
            console.log("Something went wrong while creating counter instance");
            console.log(err.message);
            return res.status(401).json({
                success: false,
                error: err.message
            })
        })
}