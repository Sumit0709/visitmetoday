import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateOtp, generateOtpToVerifyEmail, verifyEmail, verifyOtp } from '../apiCalls/authUser'
import Base from '../core/Base'
import Timer from '../core/Timer'
import { isvalidOtp } from '../validationCheck/validate'

const VerifyEmailAndMobile = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {email: defaultEmail, mobileNumber: defaultMobileNumber} = location.state;
    // console.log(defaultEmail, defaultMobileNumber);

    const [values, setValues] = useState({
        isOtpGeneratedEmail: false,
        isBtnActiveEmail: true,
        email: defaultEmail,
        otpEmail: "",
        otpEmailError: false,
        isEmailVerified: false,

        isOtpGeneratedMobile: false,
        isBtnActiveMobile: true,
        mobileNumber: defaultMobileNumber,
        otpMobile: "",
        otpMobileError: false,
        isMobileVerified: false,

        otpRequestSentEmail: false,
        otpRequestSentMobile: false,

    })

    const onGenerateOtpEmail = () => {
        setValues({...values, isBtnActiveEmail: false});
        generateOtp(values.email, 1)
            .then(response => {
                if(response.success){
                    setValues({...values, isOtpGeneratedEmail: true, isBtnActiveEmail: false});
                    // setTimeout(() => {
                    //     setValues({...values, isOtpGeneratedEmail: true, isBtnActiveEmail: true})
                    // }, 15000);
                }else{
                    setValues({...values, isBtnActiveEmail: true});
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, isBtnActiveEmail: true});
                console.log(err);
            })
    }

    const onVerifyOtpEmail = () => {
        if(!isvalidOtp(values.otpEmail)){
            setValues({...values, otpEmailError: 'Invalid otp!'})
            return;
        }

        setValues({...values, otpRequestSentEmail: true})

        verifyOtp(values.email, 1, values.otpEmail)
            .then(response => {
                if(response.success){
                    // Email has been successfully verified
                    console.log('Email verified successfully');
                    if(values.isMobileVerified){
                        navigate('/auth/signin',{replace: true})
                    }else{
                        setValues({...values, isEmailVerified: true});
                    }
                }else{
                    setValues({...values, otpEmailError: response.error, otpRequestSentEmail: false})
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, otpEmailError: 'something went wrong', otpRequestSentEmail: false})
                console.log(err);
            })
    }



    // MOBILE NUMBER 
    const onGenerateOtpMobile = () => {
        setValues({...values, isBtnActiveMobile: false});
        generateOtp(values.mobileNumber, 2)
            .then(response => {
                if(response.success){
                    setValues({...values, isOtpGeneratedMobile: true, isBtnActiveMobile: false});
                    // setTimeout(() => {
                    //     setValues({...values, isOtpGeneratedMobile: true, isBtnActiveMobile: true})
                    // }, 25000);
                }else{
                    setValues({...values, isBtnActiveMobile: true});
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, isBtnActiveMobile: true});
                console.log(err);
            })
    }

    const onVerifyOtpMobile = () => {
        if(!isvalidOtp(values.otpMobile)){
            setValues({...values, otpMobileError: 'Invalid Otp!'})
            return;
        }

        setValues({...values, otpRequestSentMobile: true})
        
        verifyOtp(values.mobileNumber, 2, values.otpMobile)
            .then(response => {
                if(response.success){
                    console.log("mobile Number verified")
                    if(values.isEmailVerified){
                        navigate('/auth/signin',{replace: true})
                    }else{
                        setValues({...values, isMobileVerified: true})
                    }
                }else{
                    setValues({...values, otpMobileError: response.error, otpRequestSentMobile: false})
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, otpMobileError: 'something went wrong', otpRequestSentMobile: false })
                
                console.log(err);
            })
    }


    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value, [`${name}Error`]: false})
    }


    const removeTimerEmail = () => {
        setValues({...values, isBtnActiveEmail: true})
    }
    const removeTimerMobile = () => {
        setValues({...values, isBtnActiveMobile: true})
    }

  return (
    <Base>
        <div>
            <h3 className='text-center m-3'>Verify Your Email</h3>
            <div className="form-group pt-4">
                <label htmlFor="email">Email used for Signin</label>
                <input disabled={true} value={values.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email id"/>
            </div>
            <button disabled={!values.isBtnActiveEmail || values.isEmailVerified} onClick={onGenerateOtpEmail} style={!values.isBtnActiveEmail || values.isEmailVerified?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Generate OTP</button>
            {!values.isBtnActiveEmail && <Timer removeTimer={removeTimerEmail}/>}
            {values.isOtpGeneratedEmail? <div><small>OTP has been sent to your registered email.</small></div>: <></>}
            <div className="form-group pt-4">
                <label htmlFor="otp">Enter OTP</label>
                <input disabled={values.isEmailVerified} style={{width:'80%', maxWidth:'400px'}} onChange={handleChange('otpEmail')} value={values.otpEmail} type="number" className="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter OTP"/>
                { <div style={values.otpEmailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.otpEmailError}</div>}  
            </div>
            <button disabled={!values.isOtpGeneratedEmail || values.isEmailVerified || values.otpRequestSentEmail} onClick={onVerifyOtpEmail} style={!values.isOtpGeneratedEmail || values.isEmailVerified || values.otpRequestSentEmail?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Verify OTP</button>
            { <div style={values.isEmailVerified? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>Email verified</div>} 
        </div>
        

        <div style={{width:'100%', height:'5px', backgroundColor:'black', marginTop:'40px'}}/>


        <div>
            <h3 className='text-center m-3'>Verify Your Mobile Number</h3>
            <div className="form-group pt-4">
                <label htmlFor="mobileNumber">Mobile number </label>
                <input disabled={true} value={values.mobileNumber} type="number" className="form-control" id="mobileNumber" aria-describedby="emailHelp" placeholder="Enter your mobile number"/>
            </div>
            <button disabled={!values.isBtnActiveMobile || values.isMobileVerified} onClick={onGenerateOtpMobile} style={!values.isBtnActiveMobile || values.isMobileVerified?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Generate OTP</button>
            {!values.isBtnActiveMobile && <Timer removeTimer={removeTimerMobile}/>}
            {values.isOtpGeneratedMobile? <div><small>OTP has been sent to your registered mobile number.</small></div>: <></>}
            <div className="form-group pt-4">
                <label htmlFor="otp">Enter OTP</label>
                <input disabled={values.isMobileVerified} style={{width:'80%', maxWidth:'400px'}} onChange={handleChange('otpMobile')} value={values.otpMobile} type="number" className="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter OTP"/>
                { <div style={values.otpMobileError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.otpMobileError}</div>}  
            </div>
            <button disabled={!values.isOtpGeneratedMobile || values.isMobileVerified || values.otpRequestSentMobile} onClick={onVerifyOtpMobile} style={!values.isOtpGeneratedMobile || values.isMobileVerified || values.otpRequestSentMobile?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Verify OTP</button>
            { <div style={values.isMobileVerified? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>Mobile number verified</div>} 
        </div>
    </Base>
  )
}

export default VerifyEmailAndMobile