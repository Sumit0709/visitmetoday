const { generateQrCode } = require("../generateQrCode");
const { GenerateSharingImage } = require("../GenerateSharingImage");
const { generateSharingImageMiddleware } = require("../GenerateSharingImageMiddleware")


exports.updateCard2 = async (req, res) => {
    
    await generateSharingImageMiddleware(req, res);
    console.log(req.props);
    
    return await GenerateSharingImage(req, res);

    // const qrResult = await generateQrCode(req, res);
    // console.log(qrResult);
    
    // if(!qrResult.success){
    //     return qrResult;
    // }
    // else{
    //     GenerateSharingImage(req, res)
    //     .then(result => {
    //         console.log(result);
    //         if(result.success){

    //         }else{
                
    //         }
    //     })
    //     .catch(err => {
    //         return err;
    //     })
    //     // const updatedCard = await GenerateSharingImage(req, res);
    //     // console.log(updatedCard)
    //     // return updatedCard;
    // }

}