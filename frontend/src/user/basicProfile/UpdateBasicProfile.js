import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../apiCalls/authUser'
import { getProfile, updateBasicProfile } from '../../apiCalls/profile'
import {getCountryAndCodeList} from "../../apiCalls/inputList"
import { useLocation, useNavigate } from 'react-router-dom'
import Base from '../../core/Base'
import { isValidAge, isValidFirstName, isValidLastName, isValidMiddleName, isValidMotto, isValidPersonality } from '../../validationCheck/validate'

import CommonCss from '../../core/CommonCss.css'
import Loading from '../../core/Loading'
import CardSectionHeading from '../../core/CardSectionHeading'
import personal_info from '../../media/personal_info.svg'

const UpdateBasicProfile = () => {
    // console.log(basicProfile)
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const {role, sessionId, token} = isAuthenticated();
    // const basicProfile = location.state;

    const [preLoad, setPreLoad] = useState({
        countries: [],
        defaultLoading: true
    })

    const [values, setValues] = useState({
        // firstName: basicProfile.firstName,
        // firstNameError: false,
        // firstNameChanged: false,
        // middleName: basicProfile.middleName,
        // middleNameError: false,
        // middleNameChanged: false,
        // lastName: basicProfile.lastName,
        // lastNameError: false,
        // lastNameChanged: false,
        // gender: basicProfile.gender,
        // genderError: false,
        // genderChanged: false,
        // age: basicProfile.age,
        // ageError: false,
        // ageChanged: false,
        // country: basicProfile.country,
        // countryChanged: false,
        // motto: basicProfile.motto,
        // mottoError: false,
        // mottoChanged: false,
        // personality: basicProfile.personality,
        // personalityError: false,
        // personalityChanged: false,
        error: "" ,
        loading: true,
        countries: [],

        serverError: false,
        serverRequestSent: false
    })

    

    const {firstName, firstNameChanged,
        middleName, middleNameChanged,
        lastName, lastNameChanged, 
        gender, genderChanged, 
        age, ageChanged,
        country, countryChanged,
        motto, mottoChanged,
        personality, personalityChanged,
        error, loading, countries} = values

    useEffect(() => {
        preLoadProfile(token, sessionId)
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

    const preLoadProfile = async (token,sessionId) => {
        getProfile(token, sessionId)
            .then(response => {
                // console.log(response);
                if(response.success){
                    // console.log(response.profile)
                    const basicProfile = response.profile;
                    setValues({
                        firstName: basicProfile.firstName,
                        firstNameError: false,
                        firstNameChanged: false,
                        middleName: basicProfile.middleName? basicProfile.middleName: "",
                        middleNameError: false,
                        middleNameChanged: false,
                        lastName: basicProfile.lastName? basicProfile.lastName: "",
                        lastNameError: false,
                        lastNameChanged: false,
                        gender: basicProfile.gender,
                        genderError: false,
                        genderChanged: false,
                        age: basicProfile.age,
                        ageError: false,
                        ageChanged: false,
                        country: basicProfile.country,
                        countryChanged: false,
                        motto: basicProfile.motto? basicProfile.motto: "",
                        mottoError: false,
                        mottoChanged: false,
                        personality: basicProfile.personality? basicProfile.personality: "",
                        personalityError: false,
                        personalityChanged: false,
                        error: "" ,
                        loading: false,
                        countries: [],
                
                        serverError: false,
                        serverRequestSent: false
                    })
                    // setProfile(response.profile);
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverError: 'something went wrong!', loading: false})
                    // console.log(response)
                }
            })
            .catch(err => {
                setValues({...values, serverError: 'something went wrong!', loading: false})
                // console.log(err)
            })
        }


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
        if(!isValidMotto(motto) && mottoChanged){
            isErrorFound = true;
            errorObject = {...errorObject, mottoError: 'motto should be 3-30 char long'}
        }
        if(!isValidPersonality(personality) && personalityChanged){
            isErrorFound = true;
            errorObject = {...errorObject, personalityError: 'bio should be under 50 char'}
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
        if(mottoChanged)
            ChangedData = {...ChangedData, motto}
        if(personalityChanged)
            ChangedData = {...ChangedData, personality}

        console.log(ChangedData);
        setValues({...values, serverRequestSent: true});

        updateBasicProfile(token, sessionId, ChangedData)
            .then(response => {
                if(response.success){
                    console.log("Profile updated Successfully");
                    navigate("/user/profile/edit")
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
    <CardSectionHeading src={personal_info} heading={'Update Basic Details'}/>
    {values.loading || preLoad.defaultLoading? <Loading/> : 
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

        <div className="form-group mt-4 row">
            {/* CHANGED MOTTO -> PERSONALITY */}
            <label htmlFor="motto" className='col-sm-3'>Personality</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea onChange={handleChange("motto")} className="form-control" id="motto" rows="1" value={motto}></textarea>
                { <div style={values.mottoError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.mottoError}</div>}
            </div>
        </div>
        <div className="form-group mt-4 row">
            <label htmlFor="personality" className='col-sm-3'>Bio</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea onChange={handleChange("personality")} className="form-control" id="personality" rows="2" value={personality}></textarea>
                { <div style={values.personalityError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.personalityError}</div>}
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

export default UpdateBasicProfile