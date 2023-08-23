import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../apiCalls/authUser'
import { updateBasicProfessionalProfile, updateBasicProfile } from '../../apiCalls/profile'
import {getCountryAndCodeList} from "../../apiCalls/inputList"
import { useLocation, useNavigate } from 'react-router-dom'
import Base from '../../core/Base'
import { isValidAge, isValidFirstName, isValidLastName, isValidMiddleName, isValidMotto, isValidPersonality } from '../../validationCheck/validate'

import CommonCss from '../../core/CommonCss.css'
import Loading from '../../core/Loading'

const UpdateBasicProfessionalProfile = () => {
    // console.log(basicProfile)
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const {role, sessionId, token} = isAuthenticated();
    const basicProfile = location.state;

    const [preLoad, setPreLoad] = useState({
        countries: [],
        defaultLoading: true
    })

    const [values, setValues] = useState({
        firstName: basicProfile.firstName,
        firstNameError: false,
        firstNameChanged: false,
        middleName: basicProfile.middleName,
        middleNameError: false,
        middleNameChanged: false,
        lastName: basicProfile.lastName,
        lastNameError: false,
        lastNameChanged: false,

        sellOnline: basicProfile.sellOnline,
        sellOnlineError: false,
        sellOnlineChanged: false,
        
        age: basicProfile.age,
        ageError: false,
        ageChanged: false,
        country: basicProfile.country,
        countryChanged: false,
        dealsIn: basicProfile.dealsIn,
        dealsInError: false,
        dealsInChanged: false,
        
        servesInArea: basicProfile.servesInArea,
        servesInAreaError: false,
        servesInAreaChanged: false,
        
        error: "" ,
        loading: false,
        countries: [],

        serverError: false,
        serverRequestSent: false
    })

    

    const {firstName, firstNameChanged,
        middleName, middleNameChanged,
        lastName, lastNameChanged, 
        sellOnline, sellOnlineChanged, 
        age, ageChanged,
        country, countryChanged,
        dealsIn, dealsInChanged,
        servesInArea, servesInAreaChanged,
        error, loading, countries} = values

    useEffect(() => {
        getCountryAndCodeList()
            .then(data => {
                if(data){
                setPreLoad({countries: data.countries, defaultLoading: false})
                // setValues({...values, countries: data.countries})
                }
                else{
                    setPreLoad({countries: ['Loading Failed...'], defaultLoading: false})
                }
            })
            .catch(err => {
                setPreLoad({countries: ['Loading Failed...'], defaultLoading: false})
            })
    },[])

    // const validInput = () => {
    //     // console.log(variable)
    //     if(firstName.length < variable.minFirstNameLength || firstName.length > variable.maxFirstNameLength)
    //         return {success: false, error: `Length of first name should be ${variable.minFirstNameLength} and ${variable.maxFirstNameLength} chars`};
        
    //     else if(middleName.length < variable.minMiddleNameLength || middleName.length > variable.maxMiddleNameLength)
    //         return {success: false, error: `Length of middle name should be ${variable.minMiddleNameLength} and ${variable.maxMiddleNameLength} chars`};
        
    //     else if(firstName.length < variable.minFirstNameLength || firstName.length > variable.maxFirstNameLength)
    //         return false;
        
    //     return true 
    // }

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, [`${name}Changed`]: true, [`${name}Error`]: false, serverError: false });
      };
    
    const onSubmit = (event) => {
        event.preventDefault();
        
        let errorObject = {};
        let isErrorFound = false;

        // if(!isValidFirstName(firstName) && firstNameChanged){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, firstNameError: 'first name should be 2-20 letters long'}
        // }
        // if(!isValidMiddleName(middleName) && middleNameChanged){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, middleNameError: 'middle name should be 2-20 letters long'}
        // }
        // if(!isValidLastName(lastName) && lastNameChanged){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, lastNameError: 'last name should be 2-20 letters long'}
        // }
        // if(!isValidAge(age) && ageChanged){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, ageError: 'age should be between 1-100'}
        // }
        if(!isValidMotto(dealsIn) && dealsInChanged){
            isErrorFound = true;
            errorObject = {...errorObject, dealsInError: 'deals in should be 3-30 char long'}
        }
        if(!isValidPersonality(servesInArea) && servesInAreaChanged){
            isErrorFound = true;
            errorObject = {...errorObject, servesInAreaError: 'serves In Area should be under 50 char'}
        }
        // if((gender<0 || gender>2) && genderChanged){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, genderError: 'Select your gender'}   
        // }

        if(isErrorFound){
            setValues({...values, ...errorObject})
            return;
        }
        
        let ChangedData = {};
        // if(firstNameChanged)
        //     ChangedData = {...ChangedData, firstName}
        // if(middleNameChanged)
        //     ChangedData = {...ChangedData, middleName}
        // if(lastNameChanged)
        //     ChangedData = {...ChangedData, lastName}
        // if(genderChanged)
        //     ChangedData = {...ChangedData, gender}
        // if(ageChanged)
        //     ChangedData = {...ChangedData, age}
        if(countryChanged)
            ChangedData = {...ChangedData, country}
        if(dealsInChanged)
            ChangedData = {...ChangedData, dealsIn}
        if(servesInAreaChanged)
            ChangedData = {...ChangedData, servesInArea}
        if(sellOnlineChanged)
            ChangedData = {...ChangedData, sellOnline}

        console.log(ChangedData);
        setValues({...values, serverRequestSent: true});

        updateBasicProfessionalProfile(token, sessionId, ChangedData)
            .then(response => {
                if(response.success){
                    console.log("Profile updated Successfully");
                    navigate("/user/profile/b/edit")
                    // alert("Basic profile update successfull")
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    
                    setValues({...values, serverError: response.error, serverRequestSent: false})
                    console.log("Something went wrong")
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, serverError: 'something went wrong', serverRequestSent: false})
                console.log(err.message);
            })
        // console.log(ChangedData);
    }

  return (
    <Base>
    {preLoad.defaultLoading? <Loading/> : 
    <form>
        {/* <div className="form-group row mt-4">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("firstName")} className="form-control" id="firstName" placeholder="Enter Your First Name" value={firstName}/>
                { <div style={values.firstNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.firstNameError}</div>}
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="middleName" className="col-sm-3 col-form-label">Middle Name</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("middleName")} className="form-control" id="middleName" placeholder="Enter Your Middle Name" value={middleName}/>
                { <div style={values.middleNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.middleNameError}</div>}
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("lastName")} className="form-control" id="lastName" placeholder="Enter Your Last Name" value={lastName}/>
                { <div style={values.lastNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.lastNameError}</div>}
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select onChange={handleChange("gender")} className="form-control" id="gender" value={gender}>
                    <option value={100}>Select Gender</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Others</option>
                </select>
                { <div style={values.genderError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.genderError}</div>}
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="age" className="col-sm-3 col-form-label">Age</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="number" onChange={handleChange("age")} className="form-control" id="age" placeholder="Enter Your age (between 1 to 100)" value={age}/>
                { <div style={values.ageError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.ageError}</div>}
            </div>
        </div> */}

        <div className="form-group row mt-4">
            <label htmlFor="countrries" className="col-sm-3 col-form-label">Country</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select onChange={handleChange("country")} className="form-control" id="countrries" value={country}>
                {preLoad.countries.map((c,index)=>{
                    return (
                        <option key={index} value={index}>{c}</option>
                        )
                    })}
                </select>
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="sellOnline" className="col-sm-3 col-form-label">Do You sell Online?<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select onChange={handleChange("sellOnline")} className="form-control" id="sellOnline" value={sellOnline}>
                    <option value={100}>Do you sell online?</option>
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                    {/* <option value={2}>Others</option> */}
                </select>
                { <div style={values.sellOnlineError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.sellOnlineError}</div>}
            </div>
        </div>

        <div className="form-group mt-4 row">
            {/* CHANGED MOTTO -> PERSONALITY */}
            <label htmlFor="motto" className='col-sm-3'>Deals In</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea onChange={handleChange("dealsIn")} className="form-control" id="dealsIn" rows="1" value={dealsIn}></textarea>
                { <div style={values.dealsInError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.dealsInError}</div>}
            </div>
        </div>
        <div className="form-group mt-4 row">
            <label htmlFor="servesInArea" className='col-sm-3'>Serves In Area</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea onChange={handleChange("servesInArea")} className="form-control" id="servesInArea" rows="2" value={servesInArea}></textarea>
                { <div style={values.servesInAreaError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.servesInAreaError}</div>}
            </div>
        </div>

        <div className="text-center mt-4">
            {<div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            {values.serverRequestSent && <Loading/>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className="myButton">Update your Profile</button>
        </div>
    </form>
    }
    </Base>
  )
}

export default UpdateBasicProfessionalProfile