const fetch = require('node-fetch')


exports.sendEmailForWelcomeMessage = async ({to_name, to_email, sender_name, sender_email}) => {

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authkey: process.env.MSG91_AUTH_KEY
        },
        body: JSON.stringify({
          to: [{name: to_name, email: to_email}],
          from: {name: sender_name, email: sender_email},
          domain: process.env.MSG91_DOMAIN,
          mail_type_id: '1',
        
          template_id: 'visitmetoday_welcomeMessage',
          variables: {}
        })
      };
      
      return fetch('https://control.msg91.com/api/v5/email/send', options)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            if(response.hasError == false){
              return {
                success: true
              }
              // return res.status(200).json(response)
            }
            else{
            console.log("ERROR IN SENDING WELCOME EMAIL");
            console.log(response);
              return {
                success: false
              }
            }
        })
        .catch(err => {
            // console.error(err)
            console.log("ERROR IN SENDING WELCOME EMAIL, IN CATCH");
            console.log(err);
            return {
              success: false
            }
            // return res.status(500).json(err)
        });

}