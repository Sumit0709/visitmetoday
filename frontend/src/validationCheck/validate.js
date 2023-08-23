import variable from '../variable'

export const isValidEmail = (email) => {
    
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i;

    if ( re.test(email) ) {return true}
    else { return false}
}

export const isValidMobileNumber = (mobile) => {
    const re = /^[4-9]{1}[0-9]{9}$/;
    if(re.test(mobile)){ return true}
    else { return false}
}


export const isValidPassword = (password) => {
    if(password == null || password == undefined || password.length<variable.minPasswordLength || password.length>variable.maxPasswordLength){
        return false;
    }
    password = password.trim();
    let lower=0, upper=0, numeric=0, special=0;
    let invalid = false;
    const specialChar = "!@#$%^&*()_/?.><,:;'{}\"[]+=~`";
    // const specialChar = "@.!&";
    const a = 97, A=65, o=48;

    for(let i=0; i<password.length; i++){
        let ch = password.charCodeAt(i);

        if(ch-a>=0 && ch-a<=25){
            lower += 1;
        }
        else if(ch-A>=0 && ch-A<=25){
            upper += 1;
        }
        else if(ch-o>=0 && ch-o<=9){
            numeric += 1;
        }
        else{
            let found = false;
            for(let j=0; j<specialChar.length; j++){
                if(password[i] == specialChar[j]){
                    found = true;
                    special += 1;
                    break;
                }
            }
            if(!found) {
                return false
            };
        }
    }

    // console.log(invalid+" "+lower+" "+upper+" "+special+" "+numeric)

    if(invalid || (lower==0 && upper==0) || numeric==0){
        return false
    }

    return true
}

export const isValidReferalCode = (referalCode) => {
    const re = /^[abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ123456789]{5}$/;
    
    if(re.test(referalCode)){ return true}
    else { return false}
}

export const isValidRole = (role) => {
    
    const roles = [process.env.REACT_APP_USER_ROLE, process.env.REACT_APP_ADMIN, process.env.REACT_APP_SUPERADMIN];
    
    if(role in roles)
        {return true;}
    else {return false;}
}

export const isValidFirstName = (firstName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(firstName)){ return true}
    else { return false}
}

export const isValidMiddleName = (middleName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(middleName) || middleName==''){ return true}
    else { return false}
}

export const isValidLastName = (lastName) => {
    const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ &]{2,20}$/;

    if(re.test(lastName) || lastName==''){ return true}
    else { return false}
}

export const isValidAge = (age) => {
    const re = /^[0123456789]{1,3}$/;

    if(re.test(age)){
        if(age>0 && age<101){return true}
        else {return false}
    }else{return false}
}

export const isValidSince = (since) => {
    const re = /^[0123456789]{4,4}$/;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    if(re.test(since)){
        if(since>1000 && since<=currentYear){return true}
        else {return false}
    }else{return false}
}

export const isValidMotto = (motto) => {
    // const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ]{3,20}$/;

    
    if(motto == ''){ return true}
    
    if(motto.length>=0 && motto.length<=50){ return true}

    return false
}
export const isValidPersonality = (personality) => {
    
    // const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ]{0,50}$/;

    // if(re.test(personality) || personality==''){ return true}
    if(personality.length>=0 && personality.length<=50){ return true}
    else { return false}
}

export const isValidExternalEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i;

    if (re.test(email) || email == '') {
        return true
    }
    else {
        return false
    }
}

export const isValidWhatsappOrContact = (mobile) => {
    const re = /^[4-9]{1}[0-9]{9}$/;
    if(re.test(mobile) || mobile==''){ return true}
    else { return false}
}

export const isValidPhoto = (photo) => {

    if(!photo){
        // console.log("Select an image file.");
        return {
            success: false,
            error: "Select an image file!"
        };
    }

    const photoName = photo.name;
    const photoSize = photo.size;
    const photoExt = photoName.substr(photoName.lastIndexOf('.') + 1);
    const validFileExt = variable.validFileExt

    if(!validFileExt.includes(photoExt)){
        return {
            success: false,
            error: "Select a valid image file!"
        }
    }
    
    if(photoSize> variable.maxPhotoSizeInBytes){
        return {
            success: false,
            error: "File size exceeded!"
        }
    }
    
    return {
        success: true
    }
}

export const isvalidOtp = (otp) => {
    const re = /^[0-9]{5}$/;

    if(re.test(otp)) { return true}
    else {return false}
}

export const isValidCustomUrl = (customUrl) => {

    const re = /^[_ a-zA-Z0-9]{2,30}$/;

    if(re.test(customUrl)){
        for(let i=0; i<customUrl.length; i++){
            if(customUrl[i]==' '){
                return false
            }
        }
        return true
    }
    else {return false}
}

const hasHindiCharacters = (str) =>{
  return str.split("").filter( function(char){ 
    var charCode = char.charCodeAt(); return charCode >= 2309 && charCode <=2361;
  }).length > 0;
}