import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToWaitingList, isAuthenticated } from '../../apiCalls/authUser'
import { getCountryAndCodeList } from '../../apiCalls/inputList';
import { isValidEmail, isValidMobileNumber } from '../../validationCheck/validate';
import EncryptionMessage from '../EncryptionMessage';
import Loading from '../Loading';

import ReCAPTCHA from "react-google-recaptcha";

import waitingList from './WaitingList.css'

const WaitingList = () => {

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
        name: '',
        nameError: '', 
        mobileNumberCountryCodes: ["Loading..."],

        serverRequestSent: false,
        serverError: false,
        success: false
    })

    useEffect(() => {
        // if(isAuthenticated()!=false){
        //     navigate("/")
        // }
        getCountryAndCodeList()
            .then(data => {
                if(data){
                    setValues({...values, mobileNumberCountryCodes: data.mobileNumberCountryCodes})
                }else{
                    setValues({...values, mobileNumberCountryCodes: ["Loading Failed..."]})
                }
            })
            .catch(err => {
                setValues({...values, mobileNumberCountryCodes: ['Loading Failed...']})
            })
    },[])

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value, [`${name}Error`]: false, serverError: false });
      }


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

        if(!isValidEmail(values.email)){
            isErrorFound = true;
            errorObject = {...errorObject, emailError: 'Invalid email'}
        }
        if(!isValidMobileNumber(values.mobileNumber)){
            isErrorFound = true;
            errorObject = {...errorObject, mobileNumberError: 'Invalid mobile number'}
        }
        if(values.name.length == 0){
            isErrorFound = true;
            errorObject = {...errorObject, nameError: "name can't be empty"}
        }
        else if(values.name.length<0 || values.name.length>30){
            isErrorFound = true;
            errorObject = {...errorObject, nameError: 'name should be less than 30 char'}
        }else{
            const re = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ]{0,30}$/;
            if(!re.test(values.name)){
                isErrorFound = true;
                errorObject = {...errorObject, nameError: 'name can only contain alphabates'}
            }
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }

        const token = await reCaptchaRef.current.executeAsync();

        setValues({...values, serverError: false, success: false, serverRequestSent: true});

        addToWaitingList({email: values.email, mobileNumberCountryCode: values.mobileNumberCountryCode,
            mobileNumber: values.mobileNumber, name: values.name, captcha: token})
            .then(response => {
                if(response.success){
                    setValues({...values, success: response.message, serverRequestSent: false});
                }
                else{
                    setValues({...values, success: false, serverRequestSent: false, serverError: response.error});
                }
            })
            .catch(err => {
                setValues({...values, success: false, serverRequestSent: false, serverError: 'something went wrong!'});
            })

    }


  return (
    <div>
    <div className='mt-5' style={{width:'80%', maxWidth:'500px', margin:'auto', padding:'20px', backgroundColor:'#000', color:'#fff', borderRadius:'15px'}}>
        <h5>Join waiting list!</h5>
        <form>
        <div className="form-group pt-4">
            <label htmlFor="email">Email Address<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("email")} value={values.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            { <div style={values.emailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailError}</div>}
            <small id="emailHelp" className="">We'll never share Your email with anyone else.</small>
        </div>
        <div className="row pt-4">
            <div className="form-group col-12">
                <label htmlFor="mobileNumber">Mobile Number<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            </div>
            <div className="form-group col-3">
                <select onChange={handleChange("mobileNumberCountryCode")} value={values.mobileNumberCountryCode} id="mobileNumberCountryCode" className="form-control">
                    {values.mobileNumberCountryCodes.map((countryCode, index) => {
                        return (
                            <option key={index} value={index}>{countryCode}</option>
                        )
                    })}
                </select>
                
            </div>
            <div className="form-group col-9">
                
                <input onChange={handleChange("mobileNumber")} value={values.mobileNumber} type="text" className="form-control" id="mobileNumber" aria-describedby="mobileNumberHelp" placeholder="Enter your 10 digit mobile number"/>
                { <div style={values.mobileNumberError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.mobileNumberError}</div>}
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share this mobile number with anyone else.</small> */}
            </div>
        </div>

        <div className="form-group pt-4">
            <label htmlFor="name">Name<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("name")} value={values.name} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name"/>
            { <div style={values.nameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.nameError}</div>}
            
        </div>

        <div className="text-center mt-5">
            {/* <EncryptionMessage/> */}
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            { <div style={values.success? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.success}</div>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} type="submit" className="myButton2 mx-auto mt-2 mb-2 p-1">Join Waiting List</button>
        </div>
        </form>
        <ReCAPTCHA
                sitekey={siteKey}
                size="invisible"
                ref={reCaptchaRef}
                onExpired = {onExpiredCaptcha}
                onErrored = {onErroredCaptcha}
                onChange = {onChangeCaptcha}
                />
    </div>
        <div className="text-center" style={{display: values.serverRequestSent? "": "none"}}>
            <Loading/>
        </div>
    </div>
  )
}

export default WaitingList