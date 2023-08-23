
exports.getProfessionalNameForCard = async (profile) => {

    const name123 = profile.companyFirstName + (profile.companyMiddleName?(" " + profile.companyMiddleName): "") + (profile.companyLastName?(" " + profile.companyLastName): "");
    const name13 = profile.companyFirstName + (profile.companyLastName?(" " + profile.companyLastName): (profile.companyMiddleName?(" " + profile.companyMiddleName):""));
    const name1 = profile.companyFirstName;
  
    let nameFontSize = 70;
  
    let name = name123;
  
    if(name123.length > 20 && name123.length <=26){
      nameFontSize = 55;
    }
    else if(name123.length > 26 && name123.length <=32){
      nameFontSize = 50;
    }
    else if(name123.length >32 && name123.length <= 37){
      nameFontSize = 40;
    }
    else if(name123.length > 37){
      name = name13;
      if(name13.length < 37){
        nameFontSize = 40;
      }
      if(name13.length <= 32){
        nameFontSize = 50;
      }
      if(name13.length <= 26){
        nameFontSize = 55;
      }
      if(name13.length <= 20){
        nameFontSize = 70;
      }
    }
  
    return {
      name: name,
      nameFontSize: nameFontSize
    }
  
  }