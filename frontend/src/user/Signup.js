import React, { useState, useEffect } from "react";
import { isAuthenticated, signup } from "../apiCalls/authUser";
import Base from "../core/Base";
import ReCAPTCHA from "react-google-recaptcha";


import {getCountryAndCodeList} from "../apiCalls/inputList"
import { useNavigate } from "react-router-dom";
import Navigating from "../core/Navigating";
import Loading from "../core/Loading";
import variable from "../variable"
import { isValidEmail, isValidMobileNumber, isValidPassword, isValidReferalCode } from "../validationCheck/validate";

import CommonCss from '../core/CommonCss.css'
import EncryptionMessage from "../core/EncryptionMessage";

const Signup = () => {

    // const countryCodes = ["+91 India", "+81 Japan", "+61 Australia"]

    const siteKey = process.env.REACT_APP_CAPTCHA_SITEKEY;
    //TEST KEY '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

    const navigate = useNavigate();
    const reCaptchaRef = React.useRef();

    const [values, setValues] = useState({
        email: "",
        emailError: false,
        mobileNumberCountryCode: 0,
        mobileNumber: "",
        mobileNumberError: false,
        password: "",
        passwordError: false,
        confirmPassword: "",
        confirmPasswordError: false,
        referalCode: "",
        referalCodeError: false,

        recaptchaValue: null,
        error: false,
        errorMessage: "",
        loading: false,
        redirect: false,
        mobileNumberCountryCodes: []
    })

    const {email, mobileNumberCountryCode, mobileNumber, password, confirmPassword, referalCode, recaptchaValue, error, errorMessage, loading, redirect, mobileNumberCountryCodes} = values

    useEffect(() => {
        if(isAuthenticated()!=false){
            navigate("/")
        }
        getCountryAndCodeList()
            .then(data => {
                if(data){
                    setValues({...values, mobileNumberCountryCodes: data.mobileNumberCountryCodes})
                }else{
                    setValues({...values, mobileNumberCountryCodes: ['Loading Failed...']})
                }
            })
            .catch(err => {
                setValues({...values, mobileNumberCountryCodes: ['Loading Failed...']})
            })
    },[])

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, [`${name}Error`]: false, error: false, errorMessage: "" });
      };


    const onExpiredCaptcha = () => {
        reCaptchaRef.current.reset();
    }

    const onErroredCaptcha = () => {
        // console.log("errored")
        reCaptchaRef.current.reset();
    }
    
    const onChangeCaptcha = () => {
        // console.log('changed');
        reCaptchaRef.current.reset();
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        let errorObject = {};
        let isErrorFound = false;

        if(!isValidEmail(email)){
            isErrorFound = true;
            errorObject = {...errorObject, emailError: 'Invalid email'}
        }
        if(!isValidMobileNumber(mobileNumber)){
            isErrorFound = true;
            errorObject = {...errorObject, mobileNumberError: 'Invalid mobile number'}
        }
        if(!isValidPassword(password)){
            isErrorFound = true;
            errorObject = {...errorObject, passwordError: 'Invalid password'}
        }
        if(!(password == confirmPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, confirmPasswordError: 'Confirm password should match password'}
        }
        if(!isValidReferalCode(referalCode)){
            isErrorFound = true;
            errorObject = {...errorObject, referalCodeError: 'Invalid referal code'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject})
            return;
        }

        const token = await reCaptchaRef.current.executeAsync();
        // 'pass'


        setValues({...values, error: false, loading: true})
        // console.log(values);
        signup({ email, mobileNumberCountryCode ,mobileNumber, password, confirmPassword, referedBy: referalCode, captcha: token })
        .then(response => {
            if(response.success){
                setValues({...values, error: false, loading:false, redirect:true})
                setTimeout(() => {
                    // navigate user to verify email
                    navigate("/auth/signin", {replace: true, state:{ email: email.toLowerCase(), mobileNumber: mobileNumber}})
                    // navigate("/signin", {replace: true})
                }, 1000);
            }
            else{
                setValues({...values, error: true, errorMessage: response.error, loading: false})
                // setTimeout(() => {
                //     setValues({...values, error:false, errorMessage: ""})
                // }, 1500);
                // console.log("SIGNUP FAILED")
            }
        })
        .catch(err => {
            setValues({...values, error: true, errorMessage: 'something went wrong!', loading: false})
            // setTimeout(() => {
            //     setValues({...values, error:false, errorMessage: ""})
            // }, 1500);
            // console.log(err.message)
        })
        
    }

    const redirectToSignin = () => {
        navigate("/auth/signin",{replace: true})
    }

    const navigateNow = () => {
        if(redirect){
            return (
                <Navigating message={"Registration Successfull"} alertClassName={"alert-success"}/>
            )
        }
    }

    const errorMessageBox = () => {
        return (
            <div className="alert alert-danger mt-3 text-center"
            style={{visibility: error? "": "hidden", width:"80%", maxWidth:"400px", margin:"auto", padding:"4px"}}
            >
                <h6>Error - {errorMessage}</h6>
            </div>
        )
      }

    return (
    <Base>
        {navigateNow()}
        {/* {errorMessageBox()} */}
        <form>
        <div className="form-group pt-4">
            <label htmlFor="email">Email Address<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("email")} value={email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            { <div style={values.emailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailError}</div>}
            <small id="emailHelp" className="">We'll never share Your email with anyone else.</small>
        </div>
        <div className="row pt-4">
            <div className="form-group col-12">
                <label htmlFor="mobileNumber">Mobile Number<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            </div>
            <div className="form-group col-3">
                <select onChange={handleChange("mobileNumberCountryCode")} value={mobileNumberCountryCode} id="mobileNumberCountryCode" className="form-control">
                    {mobileNumberCountryCodes.map((countryCode, index) => {
                        return (
                            <option key={index} value={index}>{countryCode}</option>
                        )
                    })}
                </select>
                
            </div>
            <div className="form-group col-9">
                
                <input onChange={handleChange("mobileNumber")} value={mobileNumber} type="text" className="form-control" id="mobileNumber" aria-describedby="mobileNumberHelp" placeholder="Enter your 10 digit mobile number"/>
                { <div style={values.mobileNumberError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.mobileNumberError}</div>}
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share this mobile number with anyone else.</small> */}
            </div>
        </div>
        
        <div className="form-group pt-4">
            <label htmlFor="password">Password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("password")} value={password} type="password" className="form-control" id="password" placeholder="Password"/>
            { <div style={values.passwordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.passwordError}</div>}
            
            <div>{`Enter a combination of atleast six numbers, letters and special characters (such as @ . ! &)`}</div>
        </div>

        <div className="form-group pt-4">
            <label htmlFor="confirmPassword">Confirm Password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("confirmPassword")} value={confirmPassword} type="password" className="form-control" id="confirmPassword" placeholder="Password"/>
            { <div style={values.confirmPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.confirmPasswordError}</div>}
        </div>
        
        <div className="form-group pt-4">
            <label htmlFor="referalCode">Referral Code<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("referalCode")} value={referalCode} type="text" className="form-control" id="referalCode" placeholder="Enter Referal Code"/>
            { <div style={values.referalCodeError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.referalCodeError}</div>}
        </div>

        {/* TODO:: Recaptcha */}
        <div className="text-center mt-4">
            <ReCAPTCHA
                sitekey={siteKey}
                size="invisible"
                ref={reCaptchaRef}
                onExpired = {onExpiredCaptcha}
                onErrored = {onErroredCaptcha}
                onChange = {onChangeCaptcha}
                />
        </div>
        {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}

        <div className="text-center mt-5">
            <EncryptionMessage/>
            { <div style={values.error? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.errorMessage}</div>}
            <button onClick={onSubmit} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-2 mb-2 p-1">Register</button>
        </div>
            <small className="d-block text-center mb-4">By Clicking Signup button you agree to our <a style={{opacity:'0.6'}}>Terms and Conditions.</a></small>
        </form>

        <div className="text-center" style={{visibility: loading? "": "hidden"}}>
            <Loading/>
        </div>

        <div className="row mt-4" style={{width: "50%", margin:"auto"}}>
            <p className="col-8 text-end">Already have an account?</p>
            <h6 onClick={redirectToSignin} className="col-4 cursor_pointer">Login</h6>
            {/* <button type="submit" className="btn btn-primary col-6 p-1">Signin</button> */}
        </div>
    </Base>
    )
}

export default Signup