const fetch = require('node-fetch')


exports.sendEmailOtpForForgotPassword = async ({to_name, to_email, sender_name, sender_email, otp}) => {

    // {to_name, to_email, sender_name, sender_email, amount}
    // const to_name = 'Sumit';
    // const to_email = 'sumitranjan327@gmail.com'
    // const sender_name = 'VisitMe Today'
    // const sender_email = 'contact@visitme.today'
    // const amount = '100';

    

    // console.log(process.env.MSG91_AUTH_KEY);
    // console.log(process.env.MSG91_DOMAIN);

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
        //   cc: [{email: 'cc@email.address'}, {email: 'test@email.address'}],
        //   bcc: [{email: 'bcc@email.address'}, {email: 'test1@email.address'}],
          domain: process.env.MSG91_DOMAIN,
          mail_type_id: '1',
        //   in_reply_to: 'If the current mail is reply of any mail then that mail Message ID.',
        //   reply_to: [{email: 'mail1@domain.com'}, {email: 'mail2@domain.com'}],
        //   attachments: [
        //     {filePath: 'Public path for file.', fileName: 'File Name'},
        //     {
        //       file: 'File in Data URI format data:content/type;base64,<data>.',
        //       fileName: 'File Name'
        //     }
        //   ],
          template_id: 'visitmetoday_forgotPassword',
          variables: {NAME: to_name, OTP: otp}
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
              return {
                success: false
              }
            }
        })
        .catch(err => {
            // console.error(err)
            return {
              success: false
            }
            // return res.status(500).json(err)
        });

}