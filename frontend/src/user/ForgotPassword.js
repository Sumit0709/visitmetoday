import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateOtp, isAuthenticated, verifyOtp, verifyOtpForForgotPassword } from '../apiCalls/authUser'
import Base from '../core/Base'

import CommonCss from '../core/CommonCss.css'
import Timer from '../core/Timer'
import { isValidEmail, isValidMobileNumber, isvalidOtp, isValidPassword } from '../validationCheck/validate'

export default function ForgetPassword() {

    const navigate = useNavigate()
    const loginDetail = isAuthenticated();

    const [values, setValues] = useState({
        isOtpGenerated: false,
        isBtnActive: true,
        emailOrMobile: "",
        emailOrMobileError: false,
        otp: "",
        otpError: '',
        newPassword: "",
        newPasswordError: false,
        confirmNewPassword: "",
        confirmNewPasswordError: false,
        otpRequestSent: false,

        otpVerificationSuccessfull: false
    })

    // useEffect(() => {
    //     if(loginDetail){
    //         navigate('/')
    //     }
    // })

    const onGenerateOtp = () => {
        // setValues({...values, isBtnActive: false});

        let errorObject = {};
        let isErrorFound = false;

        if(!isValidEmail(values.emailOrMobile)){
            isErrorFound = true;
            errorObject = {...errorObject, emailOrMobileError: 'Invalid email'}
        }
        
        if(!isValidPassword(values.newPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, newPasswordError: 'Invalid password'}
        }
        if(!(values.newPassword == values.confirmNewPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, confirmNewPasswordError: 'Confirm password should be same as password'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }
        generateOtp(values.emailOrMobile, 0)
            .then(response => {
                if(response.success){
                    setValues({...values, isOtpGenerated: true, isBtnActive: false});
                    // setTimeout(() => {
                    //     setValues({...values, isBtnActive: true})
                    // }, 25000);
                }else{
                    setValues({...values, isBtnActive: true})
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, isBtnActive: true})
                console.log(err);
            })
    }

    const onVerifyOtp = () => {

        let errorObject = {};
        let isErrorFound = false;

        if(!isValidEmail(values.emailOrMobile)){
            isErrorFound = true;
            errorObject = {...errorObject, emailOrMobileError: 'Invalid email'}
        }
        
        if(!isValidPassword(values.newPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, newPasswordError: 'Invalid password'}
        }
        if(!(values.newPassword == values.confirmNewPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, confirmNewPasswordError: 'Confirm password should be same as password'}
        }

        if(!isvalidOtp(values.otp)){
            isErrorFound = true;
            errorObject = {...errorObject, otpError: 'Invalid otp'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }

        setValues({...values, otpRequestSent: true})

        verifyOtpForForgotPassword(
            values.emailOrMobile,0, values.otp, values.newPassword, values.confirmNewPassword)
            .then(response => {
                if(response.success){
                    // console.log(response.message)
                    setValues({...values, otpVerificationSuccessfull: 'Otp verified successfully, redirecting...'})
                    setTimeout(() => {
                        navigate('/auth/signin',{replace: true})
                    }, 2000);

                }else{
                    setValues({...values, otpError: response.error, otpRequestSent: false, otpVerificationSuccessfull:false})
                    // console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, otpError: 'something went wrong', otpRequestSent: false, otpVerificationSuccessfull:false})
                // console.log(err);
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
        <h3 className='text-center m-3'>Forgotten Password</h3>
        <div className="form-group pt-4">
            <label htmlFor="emailOrMobile">Email<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input disabled={values.isOtpGenerated} onChange={handleChange("emailOrMobile")} value={values.emailOrMobile} type="email" className="form-control" id="emailOrMobile" aria-describedby="emailHelp" placeholder="Enter your email"/>
            { <div style={values.emailOrMobileError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailOrMobileError}</div>}
        </div>
        <div className="form-group pt-4">
            <label htmlFor="newPassword">new password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input disabled={values.isOtpGenerated} onChange={handleChange("newPassword")} value={values.newPassword} type="password" className="form-control" id="newPassword" aria-describedby="emailHelp" placeholder="Enter new password"/>
            { <div style={values.newPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.newPasswordError}</div>}
        
            <div>{`Enter a combination of atleast six numbers, letters and special characters (such as @ . ! &)`}</div>
        </div>
        <div className="form-group pt-4">
            <label htmlFor="confirmNewPassword">confirm new password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input disabled={values.isOtpGenerated} onChange={handleChange('confirmNewPassword')} value={values.confirmNewPassword} type="password" className="form-control" id="confirmNewPassword" aria-describedby="emailHelp" placeholder="Confirm New Password"/>
            { <div style={values.confirmNewPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.confirmNewPasswordError}</div>}
        </div>

        <button disabled={!values.isBtnActive} onClick={onGenerateOtp} style={!values.isBtnActive?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton'>Generate OTP</button>
        {!values.isBtnActive && <Timer removeTimer={removeTimer}/>}
        {values.isOtpGenerated? <div><small style={{color: 'green'}}>OTP has been sent to your registered email.</small></div>: <></>}
        <div className="form-group pt-4">
            <label htmlFor="otp">Enter OTP<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('otp')} value={values.otp} type="text" className="form-control" id="otp" aria-describedby="emailHelp" placeholder="Enter OTP"/>
            { <div style={values.otpError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.otpError}</div>}
        </div>
        { <div style={values.otpVerificationSuccessfull? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.otpVerificationSuccessfull}</div>}
        <button disabled={!values.isOtpGenerated || values.otpRequestSent} onClick={onVerifyOtp} style={!values.isOtpGenerated||values.otpRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton mt-4'>Verify OTP</button>

    </Base>
  )
}
