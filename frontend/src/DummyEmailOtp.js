import React, { useEffect } from 'react'

const DummyEmailOtp = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
        script.async = true;
        script.onload = () => {
          window.initSendOTP(configuration);
        };
        document.body.appendChild(script);
      }, []);

      const configuration = {
        widgetId: "3362646b4957393536313032",
        tokenAuth: "389876T2197OI9peD63ddf71bP1",
        success: (data) => {
            // get verified token in response
            console.log('success response', data);
        },
        failure: (error) => {
            // handle error
            console.log('failure reason', error);
        }
    }

  return (
    <h1 className='text-center mt-5'>Email Verification</h1>
  )
}

export default DummyEmailOtp