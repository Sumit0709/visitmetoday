import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../apiCalls/authUser";

import ReCAPTCHA from "react-google-recaptcha";
import Base from "../core/Base";
import Loading from "../core/Loading";
import Navigating from "../core/Navigating";

import variable from "../variable"
import EncryptionMessage from "../core/EncryptionMessage";
import { isValidEmail, isValidMobileNumber, isValidPassword } from "../validationCheck/validate";

import CommonCss from '../core/CommonCss.css'

const Signin = () => {


    const siteKey = process.env.REACT_APP_CAPTCHA_SITEKEY;
    // '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' //TEST KEY 

    const navigate = useNavigate();
    const reCaptchaRef = React.useRef();

    const [values, setValues] = useState({
        emailOrMobile: "",
        emailOrMobileError: null,
        password: "",
        passwordError: null,
        error: false,
        errorMessage: "", 
        loading: false,
        redirect: false
    })

    const {emailOrMobile, password, error, errorMessage, loading, redirect} = values


    useEffect(() => {
        if(isAuthenticated()!=false){
            navigate("/")
        }
    },[])


    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, [`${name}Error`]: null, error: false, errorMessage: '' });
      };
    
    // const onChangeReCAPTCHA = async () => {
    //     setValues({...values, recaptchaValue: recaptchaRef.current.getValue()})
    //     // const recaptchaToken = await recaptchaRef.current.executeAsync();
    //     // recaptchaRef.reset();
    //     // apply to form data
    // }
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
        let isErrorFound = false

        if(!isValidEmail(emailOrMobile)){
            isErrorFound = true;
            errorObject = {...errorObject, emailOrMobileError: 'Invalid email id'}
        }
        if(!isValidPassword(password)){
            isErrorFound = true;
            errorObject = {...errorObject, passwordError: 'Invalid password'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject})
            return;
        }

        const token = await reCaptchaRef.current.executeAsync();
        // 'pass'
        // console.log(token);

        // const emailOrMobileToLower = emailOrMobile.toLowerCase() 
        setValues({...values, error: false, loading: true});
        signin({emailOrMobile: emailOrMobile.toLowerCase(), password, captcha: token})
            .then(response => {
                if(response.success){
                    
                    // Signin successfull
                    // store token into local storage
                    authenticate({"token": response.token,"email": response.email, "sessionId": response.sessionId, "role":response.role, "isProfile": response.isProfile }, ()=>{
                        setValues({...values, error:false, redirect: true});
                        console.log("DONE")
                        setTimeout(() => {
                            performRedirect(response.isProfile);
                        }, 1000);
                        // console.log(isAuthenticated());
                    })
                }
                // else if(response.redirectToVerify){
                //     // setValues({...values, error:false, redirect: true});
                //     // console.log("DONE")
                //     // setTimeout(() => {
                //         if(response.redirectToVerify == 3) {navigate('/auth/verify', {state:{ email: response.email, mobileNumber: response.mobileNumber}})}
                //         else if(response.redirectToVerify == 1) {navigate('/auth/verify/email',{state: {email: response.email}})}
                //         else if(response.redirectToVerify == 2) {navigate('/auth/verify/mobileNumber',{ state: {mobileNumber: response.mobileNumber}})}
                //     // }, 1000);
                // }
                else{
                    setValues({...values, success:false, error: true, errorMessage: response.error, loading: false})
                    // setTimeout(() => {
                    //     setValues({...values, error:false, errorMessage: ""})
                    // }, 1500);
                    
                }
            })
            .catch(err => {
                setValues({...values, success:false, error: true, errorMessage: "Something went wrong.", loading: false})
                // setTimeout(() => {
                //     setValues({...values, error:false, errorMessage: ""})
                // }, 1500);
                // console.log(err);
            })
        
        // setValues({emailOrMobile:"", password: "", loading: false});
    }

    const performRedirect = (isProfile) => {

        if(isProfile){
            navigate("/user/home",{replace: true})
        }
        else{
            navigate("/user/profile/create",{replace: true})
        }
        // TODO:: Redirect based on user's role
        // if(user && user.role == process.env.superAdmin){// 1 for admin
        //     // redirect to super admin
        // }else if(user && user.role == process.env.admin){// 1 for admin
        //     // redirect to admin profile
        // }
        // else{
        //     // redirect to user profile
        // }
        
    }

    const redirectToSignup = () => {
        navigate("/auth/signup",{replace: true})
    }

    
      const errorMessageBox = () => {
        return (
            <div className="alert alert-danger mt-3 text-center"
            style={{visibility: error? "": "hidden", width:"80%", maxWidth:"400px", margin:"auto", padding:"4px"}}
            >
                <h6>{errorMessage}</h6>
            </div>
        )
      }

    const navigateNow = () => {
        if(redirect){
            return (
                <Navigating message={"Login Successfull"} alertClassName={"alert-success"}/>
            )
        }
    }

    const onForgotPassword = () => {
        navigate('/forgot/password', {replace: false})
    }

    return (
        <Base>
            {navigateNow()}
            {/* {errorMessageBox()} */}
            <form>
            <div className="form-group pt-4">
                <label htmlFor="emailOrMobile">Email<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
                <input onChange={handleChange("emailOrMobile")} value={emailOrMobile} type="email" className="form-control" id="emailOrMobile" aria-describedby="emailHelp" placeholder="Enter your email id"/>
                { <div style={values.emailOrMobileError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailOrMobileError}</div>}
            </div>
            <div className="form-group pt-4">
                <label htmlFor="password">Password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
                <input onChange={handleChange("password")} value={password} type="password" className="form-control" id="password" placeholder="Password"/>
                { <div style={values.passwordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.passwordError}</div>}
            </div>
            <div className="mt-2 cursor_pointer" style={{color: 'red', fontWeight:700}}><a onClick={onForgotPassword} style={{fontWeight:'400'}} onMouseEnter={(event) => event.target.style.fontWeight='500'}>Forgot Password ?</a></div>
    
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

                {/* <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={variable.RECAPTCHA_SITE_KEY}
                    // theme= "dark"
                    onChange={onChangeReCAPTCHA}
                    onExpired = {() => {console.log("Reload captcha")}}
                    onErrored = {() => {console.log("Error while loading captcha")}}
                /> */}
            </div>
            {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <div className="text-center mt-5">
                <EncryptionMessage/>
                { <div style={values.error? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.errorMessage}</div>}
                <button onClick={onSubmit} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">Login</button>
            </div>
            <div className="text-center" style={{visibility: loading? "": "hidden"}}>
                <Loading/>
            </div>
            </form>
            <div className="row mt-4" style={{width: "50%", margin:"auto"}}>
                <p className="col-8 text-end">Don't have an account?</p>
                <h6 onClick={redirectToSignup} className="col-4 cursor_pointer" style={{color: 'red'}}>Register</h6>
            </div>
        </Base>
        )
}

export default Signin