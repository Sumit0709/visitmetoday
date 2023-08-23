const Canvas = require("canvas");
const ProfessionalProfile = require("../../../model/professionalProfile");


const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var words = text.split(" ");
    var line = "";
  
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  };
  

exports.GenerateProfessionalSharingImage = async (req, res) => {

    const {
      cw,
      ch,
      url,
      name,
      mottoText,
      mottoMessage,
      personalityText,
      personalityMessage,
      footerMessage,
      websiteName,
      canvasBackground,
      leftPadding,
      rightPadding,
  
      fontcolor,
      font,
  
      // Profile Pic
      r,
      profilePicTopMargin,
      lineColor,
      lineWidth,
  
      // name
      nameFontSize,
      nameTopPadding,
  
      // motto
      mottoFontSize,
      mottoTopPadding,
  
      // personality
      personalityFontSize,
      personalityTopPadding,
  
      // QR
      qrTopPadding,
  
      // url
      urlFontSize,
      urlTopPadding,
  
      // Footer
      footerFontSize,
      footerTopPadding,
  
      // Website Name
      websiteNameFontSize,
  
      // Image file properties
      imageFileType,

      // middleware Added
      profilePicRequestUrl,
      qrCodeUrl,
      professionalProfileId,
      referalCode
    } = req.props;
  
    // Creating Canvas
    const canvas = Canvas.createCanvas(cw, ch);
    const ctx = canvas.getContext("2d");
  
    // Setting Background Colour of Canvas
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // ****PROFILE PIC****
    const circle = {
      x: cw / 2,
      radius: r,
      y: r + profilePicTopMargin,
    };
  
    // Draw line under profile Pic
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(50, circle.y);
    ctx.lineTo(cw - leftPadding, circle.y);
    ctx.lineTo(cw - rightPadding, circle.y + lineWidth);
    ctx.lineTo(leftPadding, circle.y + lineWidth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // Load profile Image
    const avatar = await Canvas.loadImage(profilePicRequestUrl);
    if (!avatar || avatar.success==false) {
      return res.status(401).json({ success: false, message: "Something went wromg" });
    }

    // Drawing circle for profile pic
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.save()
    ctx.clip();
  
  
    // calculate aspect ratio
    const aspect = avatar.height / avatar.width;
    
    // Math.max is used to have cover effect while Math.min is used for contain effect
    const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
    const hsy = circle.radius * Math.max(aspect, 1.0);
    
    // x - hsl and y - hsy centers the image
    ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);
  
    // -----------------PROFILE PIC ENDS HERE ----------------------
  


    // To calculate height from top for each subsequent field
    var heightTillNow = circle.y + circle.radius;
  
    // Setting font color
    ctx.restore();
    ctx.fillStyle = `${fontcolor}`;
  
    // setting text alignment
    ctx.textAlign = "center";
  
    // NAME and verified
    const verified = await Canvas.loadImage('./media/Business1.png')
    if (!verified || verified.success==false) {
      return res.status(401).json({ success: false, message: "Something went wromg" });
    }
    const vw = verified.width
    // console.log(vw)
    const vh = verified.height
    // console.log(vh)

    heightTillNow += nameTopPadding;
    ctx.font = `600 ${nameFontSize}px ${font}`;
    ctx.fillText(name, (cw - vw)/ 2, heightTillNow);
    

    const metrics = ctx.measureText(name);
    const nameWidth = metrics.width

    ctx.drawImage(verified, (cw+nameWidth)/2-40, heightTillNow-nameTopPadding/2 -30)

    heightTillNow += nameFontSize+10;


    // MY MOTTO
    heightTillNow += mottoTopPadding;
    ctx.font = `${mottoFontSize}px ${font}`;
    ctx.fillText(`${mottoText} ${mottoMessage}`, cw / 2, heightTillNow);
    heightTillNow += mottoFontSize;
  
    // MY PERSONALITY
    heightTillNow += personalityTopPadding;
    ctx.font = `${personalityFontSize}px ${font}`;
    wrapText(ctx,`${personalityText} ${personalityMessage}`,cw/2,heightTillNow,cw-leftPadding-rightPadding,1.2*personalityFontSize);
    heightTillNow += personalityFontSize;
  
  
    // QR CODE 
    
    const qrw = 800//qr.width;
    const qrh = 800//qr.height;
    // Draw QR on Canva
    heightTillNow +=  qrTopPadding;
    
    
    
    const qrCode = new Canvas.Image()
    qrCode.onload =  () => ctx.drawImage(qrCode, (cw - qrw) / 2, heightTillNow, qrw, qrh);
    qrCode.onerror = (err) => {return res.status(401).json({success: false, error: err})}
    qrCode.src = qrCodeUrl
    heightTillNow += qrh;

    // URL
    heightTillNow += urlTopPadding;
    ctx.font = `${urlFontSize}px ${font}`;
    ctx.fillText(url, cw / 2, heightTillNow);
    heightTillNow += urlFontSize;
  
    // Footer Message ex. "Scan this QR code..."
    heightTillNow += footerTopPadding;
    ctx.font = `${footerFontSize}px ${font}`;
    wrapText(
      ctx,
      footerMessage,
      cw / 2,
      heightTillNow,
      cw - 200,
      1.2 * urlFontSize
    );  

    
    // Encryption message
    const encryptionMessage = await Canvas.loadImage("./media/encryption5.png")
    if (!encryptionMessage || encryptionMessage.success==false) {
      return res.json({ success: false, message: "Something went wromg" });
    }
    const emsgw = encryptionMessage.width
    // console.log(emsgw)
    const emsgh = encryptionMessage.height
    // console.log(emsgh)
    // const emsgw = 315;// width = 315
    // const emsgh = 101;// height = 101
    const eMsgMarginBottom = 0
    ctx.drawImage(encryptionMessage,(cw-emsgw) / 2+30, ch-websiteNameFontSize-emsgh-eMsgMarginBottom)
    
  
    // websiteName
    ctx.font = `${websiteNameFontSize}px ${font}`;
    ctx.fillText(websiteName, cw / 2, ch - websiteNameFontSize);
    


    canvas.toBuffer((err,buf)=>{
  
      if(err){
        return res.json({ success: false, error: "Something went wromg" });
      }
      ProfessionalProfile.findByIdAndUpdate(professionalProfileId,{sharingImage: buf},{upsert:false, new: true})
        .exec()
        .then(result => {
          if(result){
            console.log("Card created successfully");
            return res.status(200).json({
              success: true,
              message: "Card updated successfully",
            })
          }
          else{
            console.log("Error in creating card")
            return res.status(401).json({
              success: false,
              error: "Error while creating card!",
            })
          }
        })
        .catch(err => {
          console.log("Error in creating card, inside catch")
          console.log(err.message)
          return res.status(500).json({
            success: false,
            error: "something went wrong!",
          })
        })
    },imageFileType);
  
  };