import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserAccount } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';
import { getCountryAndCodeList } from '../../apiCalls/inputList';

import Base from '../../core/Base'
import EncryptionMessage from '../../core/EncryptionMessage';
import Loading from '../../core/Loading';
import { isValidEmail, isValidMobileNumber, isValidPassword, isValidRole } from '../../validationCheck/validate';
import variable from '../../variable';

const CreateUserAccount = () => {

  const navigate = useNavigate();

  const {token, sessionId, role} = isAuthenticated()

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

    role: 0,
    roleError: false,

    mobileNumberCountryCodes: ['Loading'],
    
    successMessage: false,
    serverError: false,
    serverRequestSent: false
})

useEffect(() => {

  if(role != process.env.REACT_APP_SUPERADMIN && role!=process.env.REACT_APP_ADMIN){
    navigate('/');
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


const onSubmit = (e) => {
  e.preventDefault();

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
  if(!isValidPassword(values.password)){
      isErrorFound = true;
      errorObject = {...errorObject, passwordError: 'Invalid password'}
  }
//   if(!isValidRole(values.role)){
//     isErrorFound = true;
//     errorObject = {...errorObject, roleError: 'Invalid Role'}
//   }
  if(!(values.password == values.confirmPassword)){
      isErrorFound = true;
      errorObject = {...errorObject, confirmPasswordError: 'Confirm password should match password'}
  }
  

  if(isErrorFound){
      setValues({...values, ...errorObject})
      return;
  }

  let newUserData = role == process.env.REACT_APP_ADMIN? {referedBy: values.referalCode}: {role: values.role};
  
  console.log(newUserData);

  setValues({...values, serverError: false, serverRequestSent: true, serverError: false, successMessage: false});
  createUserAccount(token, sessionId, 
    {
      ...newUserData,
      email: values.email,
      mobileNumberCountryCode: values.mobileNumberCountryCode,
      mobileNumber: values.mobileNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }, role == process.env.REACT_APP_ADMIN)
    .then(res => {
      if(res.success){
        // window.alert('User Account Created Successfully')
        setValues({...values, serverRequestSent: false, serverError: false, successMessage: res.message})
      }
      else{
        setValues({...values, serverRequestSent: false, serverError: res.error, successMessage: false})
      }
    })
    .catch(err => {
      setValues({...values, serverRequestSent: false, serverError: err.message, successMessage: false});
    })
}


  return (
    
    <Base>

    <h2 className='text-center'>Create User's Account</h2>
    
    <form>
        <div className="form-group pt-4">
            <label htmlFor="email">Email Address<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("email")} value={values.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            { <div style={values.emailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailError}</div>}
            
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
            <label htmlFor="password">Password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("password")} value={values.password} type="password" className="form-control" id="password" placeholder="Password"/>
            { <div style={values.passwordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.passwordError}</div>}
            
            <div>{`Enter a combination of atleast six numbers, letters and special characters (such as @ . ! &)`}</div>
        </div>

        <div className="form-group pt-4">
            <label htmlFor="confirmPassword">Confirm Password<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <input onChange={handleChange("confirmPassword")} value={values.confirmPassword} type="password" className="form-control" id="confirmPassword" placeholder="Password"/>
            { <div style={values.confirmPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.confirmPasswordError}</div>}
        </div>
        
        {
        role == process.env.REACT_APP_ADMIN? 
            <div className="form-group pt-4">
                <label htmlFor="referalCode">Referal Code<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
                <input onChange={handleChange("referalCode")} value={values.referalCode} type="text" className="form-control" id="referalCode" placeholder="Enter Referal Code"/>
                { <div style={values.referalCodeError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.referalCodeError}</div>}
                <small>Make sure to add your invite code. Adding someone else's invite code will not count towards your contribution.</small>
            </div>
        : <></>
        }

        {
        role == process.env.REACT_APP_SUPERADMIN? 
            <div className="form-group pt-4">
                <label htmlFor="role">Role<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
                <input disabled={role == process.env.REACT_APP_SUPERADMIN? false: true} onChange={handleChange("role")} value={values.role} type="text" className="form-control" id="role" placeholder="Enter User Role"/>
                { <div style={values.roleError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.roleError}</div>}
                {/* <small>Make sure to add your invite code. Adding someone else's invite code will not count towards your contribution.</small> */}
            </div>
        : <></>
        }
        

        <div className="text-center mt-5">
            <EncryptionMessage/>
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            { <div style={values.successMessage? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.successMessage}</div>}
            <button onClick={onSubmit} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-2 mb-2 p-1">Create Account</button>
        </div>
            <small className="d-block text-center mb-4">By Clicking Signup button you agree to our <a style={{opacity:'0.6'}}>Terms and Conditions.</a></small>
        </form>
        <div className="text-center" style={{visibility: values.serverRequestSent? "": "hidden"}}>
            <Loading/>
        </div>

    </Base>

  )
}


export default CreateUserAccount;