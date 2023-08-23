const { generateQrCode } = require("../generateQrCode");
const { GenerateSharingImage } = require("../GenerateSharingImage");
const { generateSharingImageMiddleware } = require("../GenerateSharingImageMiddleware")


exports.updateCard = async (req, res) => {

    await generateSharingImageMiddleware(req, res);
    const qrResult = await generateQrCode(req, res);
    console.log(qrResult)
    
    if(!qrResult.success){
        return qrResult;
    }

    const updateResult = await GenerateSharingImage(req, res);

    return updateResult;
    
}