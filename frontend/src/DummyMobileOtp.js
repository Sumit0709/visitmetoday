import React, { useEffect } from 'react'

const DummyMobileOtp = () => {


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
        widgetId: "3362646b4736393838323238",
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
    <h1 className='text-center mt-5'>Mobile Number Verification</h1>
  )
}

export default DummyMobileOtp;