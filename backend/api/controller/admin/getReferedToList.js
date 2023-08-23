const { admin } = require("../ViewController");
const ReferalCode = require('../../model/referalCode');
const Signup = require("../../model/signup");

const getUserFromReferalCode = async (referalCode) => {

    const referalCodeDoc = await ReferalCode.findOne({referalCodeValue: referalCode}).exec();
    if(!referalCodeDoc){
        return {
            user: false,
            error: 'Referal Doc Not Found'
        }
    }

    const user = await Signup.findById(referalCodeDoc.signupId).exec();
    if(!user){
        return {
            user: false,
            error: 'Can not find user for this referal Code'
        }
    }
    else{
        return {
            user: user
        }
    }

    // return ReferalCode.findOne({referalCodeValue: referalCode}).exec()
    //     .then(res => {
    //         if(res){
    //             const signupId = res.signupId;
    //             return Signup.findById(signupId).exec()
    //                 .then(user => {
    //                     if(user){
    //                         return {
    //                             user: user
    //                         }
    //                     }
    //                     else{
    //                         return {
    //                             user: false,
    //                             error: 'Can not find user for this referal Code'
    //                         }
    //                     }
    //                 })
    //                 .catch(err => {
    //                     return {
    //                         user: false,
    //                         error: 'Can not find user for this referal Code'
    //                     }
    //                 })
    //         }
    //         else{
    //             return {
    //                 user: false,
    //                 error: 'Referal Doc is not present in DB'
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         return {
    //             user: false,
    //             error: 'Referal Doc Not Found'
    //         }
    //     })

}

exports.getReferedToList = async (req, res) => {

    const viewResult = admin(req, res);
    if(viewResult.success == false){
        return res.status(401).json(viewResult);
    }

    const email = req.body.email;
    
    try{
        const user = await Signup.findOne({email: email}).exec()
        if(!user){
            return res.status(404).json({
                success: false,
                error: "User Does not exist for this email"
            })
        }
        const signupId = user._id;

        const referalCodeDoc = await ReferalCode.findOne({signupId: signupId}).exec();
        if(!referalCodeDoc){
            return res.status(404).json({
                success: false,
                error: 'Referal Document not found for user'
            })
        }
        let finalResult = [];

        const referedToArr = referalCodeDoc.referedTo;

        // finalResult.push(referedToArr);
        const totalRefered = referedToArr.length;

        for(let i=0; i<totalRefered; i++){
            const user = await getUserFromReferalCode(referedToArr[i]);

            if(user.user){
                finalResult.push({
                    referalCode: referedToArr[i],
                    email: user.user.email
                })
            }else{
                finalResult.push({
                    referalCode: referedToArr[i],
                    email: user.error
                })
            }
        }

        return res.status(200).json({
            success: true,
            totalRecords: totalRefered,
            doc: finalResult
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}
