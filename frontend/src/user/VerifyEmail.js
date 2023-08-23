import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateOtp, generateOtpToVerifyEmail, verifyEmail, verifyOtp } from '../apiCalls/authUser'
import Base from '../core/Base'
import EncryptionMessage from '../core/EncryptionMessage'
import Timer from '../core/Timer'
import { isvalidOtp } from '../validationCheck/validate'

const VerifyEmail = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [values, setValues] = useState({
        isOtpGenerated: false,
        isBtnActive: true,
        email: location.state.email,
        otp: "",
        otpError: false,
        otpRequestSent: false
    })

    const onGenerateOtp = () => {
        setValues({...values, isBtnActive: false});
        generateOtp(values.email, 1)
            .then(response => {
                if(response.success){
                    setValues({...values, isOtpGenerated: true, isBtnActive: false});
                    // setTimeout(() => {
                    //     setValues({...values, isBtnActive: true, isOtpGenerated: true})
                    // }, 60000);
                }else{
                    setValues({...values, isBtnActive: true});
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, isBtnActive: true});
                console.log(err);
            })
    }

    const onVerifyOtp = () => {
        if(!isvalidOtp(values.otp)){
            setValues({...values, otpError: 'Invalid Otp!'})
            return;
        }

        setValues({...values, otpRequestSent: true})

        verifyOtp(values.email, 1, values.otp)
            .then(response => {
                if(response.success){
                    navigate('/auth/signin',{replace: true})
                }else{
                    setValues({...values, otpError: response.error, otpRequestSent: false})
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, otpError: 'something went wrong', otpRequestSent: false})
                console.log(err);
            })
    }



    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value, [`${name}Error`]: false})
    }

    const removeTimer = () => {
        setValues({...values, isBtnActive: true})
    }

  return (
    <Base>
        <h3 className='text-center m-3'>Verify Your Email</h3>
        <div className="form-group pt-4">
            <label htmlFor="email">Email</label>
            <input disabled value={values.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email id"/>
        </div>
        <button disabled={!values.isBtnActive} onClick={onGenerateOtp} style={!values.isBtnActive?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>{values.isOtpGenerated?'Resend Otp': 'Generate OTP'}</button>
        {!values.isBtnActive && <Timer removeTimer={removeTimer}/>}
        {values.isOtpGenerated? <div><small>OTP has been sent to your registered email.</small></div>: <></>}
        <div className="form-group pt-4">
            <label htmlFor="otp">Enter OTP</label>
            <input style={{width:'80%', maxWidth:'400px'}} onChange={handleChange('otp')} value={values.otp} type="number" className="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter OTP"/>
            { <div style={values.otpError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.otpError}</div>}                                                           
        </div>
        <button disabled={!values.isOtpGenerated || values.otpRequestSent} onClick={onVerifyOtp} style={!values.isOtpGenerated || values.otpRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Verify OTP</button>

        <div className='text-center mt-5 pt-5'>
            <EncryptionMessage/>
        </div>
    </Base>
  )
}

export default VerifyEmail