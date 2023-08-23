const { GenerateSharingImage } = require("./GenerateSharingImage");
const Profile = require("../../model/profile") 
const UsedUrl = require("../../model/usedUrl")

const canvas = require("../../../canvasVariable");
const { generateQrCode } = require("./generateQrCode");
const { getNameForCard } = require("./getNameForCard");

exports.generateSharingImageMiddleware = async (req, res, next) => {

  try{
  const profileId = req.body.user.profileId;
  const profilePicRequestUrl = `${process.env.PROFILE_PHOTO_URL}/${req.params.sessionId}`
  // console.log(profileId)
  let profile = req.body.profile? req.body.profile:  await Profile.findById(profileId).exec();

  if(!profile){
    console.log("Profile not found in generate sharing image middleware")

    profile = await Profile.findOne({signupId: req.body.user._id}).exec()
    if(!profile){
      console.log("Profile again not found. Send error message!")
      // console.log(req.body.user)
      return res.status(401).json({
        success:false,
        error: "Profile not found"
      })
    }
  }


  req.body.user.profileId = profile._id;

  let usedUrl = null
  if(profile.profileUrl) usedUrl= await UsedUrl.findById(profile.profileUrl).exec();
  else{
    usedUrl = {url: req.body.profileUrl}
  }

  if(!usedUrl || usedUrl == undefined){
    // console.log("UsedUrl not found")
    return res.status(404).json({
      success:false,
      error: "UsedUrl not found"
    })
  }

  const profileUrl = req.body.profileUrl? req.body.profileUrl: usedUrl.url;
  
  if(!profileUrl || profileUrl == undefined){
    return res.status(404).json({
      success:false,
      error: "Url not found"
    })
  }

  const qrCodeUrl = profile.qrCodeUrl
  
  // Getting name to show on Card
  const {name, nameFontSize} = await getNameForCard(profile);
  
  // url to sho won card
  const url = `https://visitme.today/${profileUrl}`
  let urlFontSize = 50;
  if(url.length > 32){
    urlFontSize = 44;
  }
  if(url.length > 40){
    urlFontSize = 38;
  }

  const mottoMessage = profile.motto? profile.motto: "";
  const personalityMessage = profile.personality? profile.personality: "";

  

  const props = {...canvas,
    url: url,
    name: name,
    mottoMessage: mottoMessage,
    personalityMessage: personalityMessage,
    profilePicRequestUrl: profilePicRequestUrl, 
    qrCodeUrl: qrCodeUrl,
    profileId: profileId,
    nameFontSize: nameFontSize,
    urlFontSize: urlFontSize,
    userRole: req.body.user.role
  }

  req.body.profileUrl = url
  req.props = props;

  if(!profile.qrCodeUrl || profile.qrCodeUrl == ""){
    generateQrCode(req, res, next);
  }
  else{
    req.props.qrCodeUrl = profile.qrCodeUrl;
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