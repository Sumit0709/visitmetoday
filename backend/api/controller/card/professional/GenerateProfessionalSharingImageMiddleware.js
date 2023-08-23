const { GenerateSharingImage } = require("../GenerateSharingImage");
const ProfessionalProfile = require("../../../model/professionalProfile") 
// const UsedUrl = require("../../../model/usedUrl")

const canvas = require("../../../../canvasVariable");
const { generateProfessionalQrCode } = require("./generateProfessionalQrCode");

const ProfessionalUsedUrl = require("../../../model/professionalUsedUrl");
const { getProfessionalNameForCard } = require("./getProfessionalNameForCard");

exports.generateProfessionalSharingImageMiddleware = async (req, res, next) => {

  try{
  const professionalProfileId = req.body.user.professionalProfileId;
  const profilePicRequestUrl = `${process.env.PROFILE_PHOTO_URL}/b/${req.params.sessionId}`
  // console.log(professionalProfileId)
  let professionalProfile = req.body.professionalProfile? req.body.professionalProfile:  await ProfessionalProfile.findById(professionalProfileId).exec();

  if(!professionalProfile){
    console.log("ProfessionalProfile not found in generate sharing image middleware")

    professionalProfile = await ProfessionalProfile.findOne({signupId: req.body.user._id}).exec()
    if(!professionalProfile){
      console.log("ProfessionalProfile again not found. Send error message!")
      // console.log(req.body.user)
      return res.status(401).json({
        success:false,
        error: "ProfessionalProfile not found"
      })
    }
  }


  req.body.user.professionalProfileId = professionalProfile._id;

  let usedUrl = null
  if(professionalProfile.professionalProfileUrl) usedUrl= await ProfessionalUsedUrl.findById(professionalProfile.professionalProfileUrl).exec();
  else{
    usedUrl = {url: req.body.professionalProfileUrl}
  }

  if(!usedUrl || usedUrl == undefined){
    // console.log("UsedUrl not found")
    return res.status(404).json({
      success:false,
      error: "UsedUrl not found"
    })
  }

  const professionalProfileUrl = req.body.professionalProfileUrl? req.body.professionalProfileUrl: usedUrl.url;
  
  if(!professionalProfileUrl || professionalProfileUrl == undefined){
    return res.status(404).json({
      success:false,
      error: "Url not found"
    })
  }

  const qrCodeUrl = professionalProfile.qrCodeUrl
  
  // Getting name to show on Card
  const {name, nameFontSize} = await getProfessionalNameForCard(professionalProfile);
  
  // url to sho won card
  const url = `https://visitme.today/b/${professionalProfileUrl}`
  let urlFontSize = 50;
  if(url.length > 32){
    urlFontSize = 44;
  }
  if(url.length > 40){
    urlFontSize = 38;
  }

  const mottoMessage = professionalProfile.dealsIn? professionalProfile.dealsIn: "";
  const personalityMessage = professionalProfile.servesInArea? professionalProfile.servesInArea: "";

  

  const props = {...canvas,
    url: url,
    name: name,
    mottoMessage: mottoMessage,
    personalityMessage: personalityMessage,
    profilePicRequestUrl: profilePicRequestUrl, 
    qrCodeUrl: qrCodeUrl,
    professionalProfileId: professionalProfileId,
    nameFontSize: nameFontSize,
    urlFontSize: urlFontSize,


  }

  req.body.professionalProfileUrl = url
  req.props = props;

  if(!professionalProfile.qrCodeUrl || professionalProfile.qrCodeUrl == ""){
    generateProfessionalQrCode(req, res, next);
  }
  else{
    req.props.qrCodeUrl = professionalProfile.qrCodeUrl;
    next()
  }

  }
  catch(err){
    console.log(err);
    return res.status(401).json({
      success: false, 
      error: 'something went wrong!'
    })
  }
}