const fetch = require('node-fetch')


exports.validateCaptcha = async (req, res, next) => {

    const token = req.body.captcha;
    if(token === undefined || token === '' || token===null){
        return res.status(401).json({
            success: false, 
            error: 'Captcha not found!'
        })
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    // '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // FOR TESTING 

    // console.log('IP address', req.connection.remoteAddress);

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`;
 
    fetch(url,
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            //x-www-form-urlencoded
          })
          .then(response => response.json())
          .then(response => {
            // console.log(response);
            if(response.success === undefined){
                return res.status(401).json({
                    success: false,
                    error: 'Captcha validation failed'
                })
            }
            else if(!response.success){
                return res.status(401).json({
                    success: false,
                    error: 'Captcha validation failed'
                })
            }
            else{
                // validation passed
                // console.log("captcha validation succesfull");
                next();
            }
          })

}