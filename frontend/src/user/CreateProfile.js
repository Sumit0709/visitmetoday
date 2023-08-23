import React, {Fragment, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated, isPlanValid } from '../apiCalls/authUser'
import { getCountryAndCodeList } from '../apiCalls/inputList';
import { createCard, createProfile, updateCard } from '../apiCalls/profile'

import CommonCss from '../core/CommonCss.css'
import EncryptionMessage from '../core/EncryptionMessage';
import InputFile from '../core/InputFile';
import Loading from '../core/Loading';

import { isValidAge, isValidFirstName, isValidLastName, isValidMiddleName, isValidMotto, isValidPersonality, isValidPhoto } from '../validationCheck/validate';
import Base from '../core/Base';

const CreateProfile = () => {

    const navigate = useNavigate();
    const {role, sessionId, token, email, isProfile} = isAuthenticated();

    // console.log("Create Profile")
    const [values, setValues] = useState({
        firstName: "",
        firstNameError: false,
        middleName: "",
        middleNameError: false,
        lastName: "",
        lastNameError: false,
        gender: 100,
        genderError: false,
        age: "",
        ageError: false,
        country: 0,
        motto: "",
        mottoError: false,
        personality: "",
        personalityError: false,
        photo: null,
        photoError: false,
        error: "" ,
        loading: false,
        countries: ['Loading...'],
        formData: new FormData(),

        serverError: false,
        serverRequestSent: false
    })

    const {firstName, middleName, lastName, gender, age, country, motto, personality, photo, error, loading, countries, formData} = values
    // const countries = ["India", "USA", "Japan"]

    const preLoad = async () => {
        getCountryAndCodeList()
            .then(data => {
                if(data){
                    setValues({...values, countries: data.countries})
                }
                else{
                    setValues({...values, countries: ['Loading Failed...']})
                }
            })
            .catch(err => {
                setValues({...values, countries: ['Loading Failed...']})
            })
    }

    useEffect(() => {
        if(isProfile){
            navigate("/user/profile",{replace: true})
        }
        formData.set("country",country)
        preLoad() //will be called in all cases because if it's not validating now, then it will validate while creating profile
        // isPlanValid(token, sessionId)
        // .then(response => {
        //     if(response.success){
        //         preLoad();
        //     }
        //     else if(response.error == 'PLAN_EXPIRED'){
        //         navigate('/auth/payment');
        //     }
        //     else{
        //         preLoad()
        //         // setValues({...values, serverRequestSent: false, serverError: response.error})
        //         // console.log("Something went wrong")
        //     }
        // })
        // .catch(err => {
        //     preLoad();
        //     // setValues({...values, serverRequestSent: false, serverError: 'something went wrong!'})
        // })

        
    },[])

    const handleChange = (name) => (event) => {
        const value = name === "photo"? event.target.files[0]: event.target.value; 
        formData.set(name,value);
        setValues({ ...values, error: false, [name]: value, [`${name}Error`]: false, serverError:false });
      };
    
    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(values);
        // console.log(formData)
        let errorObject = {};
        let isErrorFound = false;

        if(!isValidFirstName(firstName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, firstNameError: 'first name should be 2-20 char long'}
        }
        if(!isValidMiddleName(middleName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, middleNameError: 'middle name should be 2-20 char long'}
        }
        if(!isValidLastName(lastName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, lastNameError: 'last name should be 2-20 char long'}
        }
        if(!isValidAge(age)){
            isErrorFound = true;
            errorObject = {...errorObject, ageError: 'age should be between 1-100'}
        }
        if(!isValidMotto(motto)){
            isErrorFound = true;
            errorObject = {...errorObject, mottoError: 'motto should be under 50 char'}
        }
        if(!isValidPersonality(personality)){
            isErrorFound = true;
            errorObject = {...errorObject, personalityError: 'bio should be under 50 char'}
        }
        if(gender<0 || gender>2){
            isErrorFound = true;
            errorObject = {...errorObject, genderError: 'Select your gender'}   
        }
        // const photoValidation = isValidPhoto(photo)
        // if(!photoValidation.success){
        //     isErrorFound = true;
        //     errorObject = {...errorObject, photoError: photoValidation.error}
        // }

        if(isErrorFound){
            setValues({...values, ...errorObject})
            return;
        }

        setValues({...values, serverRequestSent: true, serverError: false});

        createProfile(token,sessionId,formData)
            .then(response => {
                console.log(response);
                if(response.success){
                    console.log("Profile created")
                    authenticate({"token": token, "sessionId": sessionId, "role":role, "isProfile": true, "email":email }, ()=>{
                        // console.log("DONE")
                        onCreateCard();
                        // onUpdateCard();
                        
                        // console.log(isAuthenticated());
                    })
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverRequestSent: false, serverError: response.error})
                    console.log("Something went wrong")
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong'})
                console.log(err);
            })
    }

    const onUpdateCard = () => {
        updateCard(token,sessionId)
        .then(result => {
            window.location.reload(false);
        })
        .catch(err => {
            window.location.reload(false);
        })
    }

    const onCreateCard = () => {
        createCard(token,sessionId)
        .then(result => {
            // window.location.reload(false);
            performRedirect();
        })
        .catch(err => {
            // window.location.reload(false);
            performRedirect();
        })
    }

    const performRedirect = () => {

        navigate("/user/profile",{replace: true})

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

  return (
    <Base>
    <form>
        <div className="form-group row mt-4">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
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
            <label htmlFor="gender" className="col-sm-3 col-form-label">Gender<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
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
            <label htmlFor="age" className="col-sm-3 col-form-label">Age<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("age")} className="form-control" id="age" placeholder="Enter Your age (between 1 to 100)" value={age}/>
                { <div style={values.ageError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.ageError}</div>}
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="countries" className="col-sm-3 col-form-label">Country<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select onChange={handleChange("country")} className="form-control" id="countries" value={country}>
                {countries.map((c,index)=>{
                    return (
                        <option key={index} value={index}>{c}</option>
                        )
                    })}
                </select>
            </div>
        </div>

        <div className="form-group mt-4 row">
            {/* CHANGED MOTTO -> PERSONALITY */}
            <label htmlFor="motto" className='col-md-3'>Personality</label> 
            <div className="col-sm-7 col-md-6 col-lg-5">
            <textarea onChange={handleChange("motto")} className="form-control" id="motto" rows="1" value={motto}></textarea>
            { <div style={values.mottoError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.mottoError}</div>}
            </div>
        </div>
        <div className="form-group mt-4 row">
            <label htmlFor="personality" className='col-md-3'>Bio</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
            <textarea onChange={handleChange("personality")} className="form-control" id="personality" rows="2" value={personality}></textarea>
            { <div style={values.personalityError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.personalityError}</div>}
            </div>
        </div>

        {/* <div className='form-group mt-4'>

            <div className='mb-1'>Upload profile Photo<span style={{color: 'red', fontWeight: '800'}}>*</span></div>
            <input onChange={handleChange("photo")} type="file" id="photo" />
            <label htmlFor="photo" className="photo"><img style={{width:'35px', height:'35px'}} src={upload}/></label>
            <span style={photo? {marginLeft: '10px', fontWeight:500, color:'green'}:{marginLeft: '10px', fontWeight:500, color:'red', opacity:'0.6'}}>
                {photo? photo.name: "Choose an image..."}
            </span>

            { <div style={!values.photoError && photo? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{`Image selected.`}</div>}
            { <div style={values.photoError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.photoError}</div>}
            
            <div><span style={{fontWeight: '500'}}>Note: </span>{`Maximum allowed File size is 8MB`}</div>
            <div><span style={{fontWeight: '500'}}>Note: </span>{`Only .png/.jpg/.jpeg files are allowed`}</div>
        </div> */}
        
        <div className='mt-4'><strong>Note: </strong>Name, Gender, Age, Country can not be changed after you create profile, so make sure that they are correct.</div>
        <div className="text-center mt-4">
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            {values.serverRequestSent && <div style={{fontWeight: '500', color:'#1D88FA'}} className='text-center'>It may take some time. Sit back and relax while we are creating your profile!</div>}
            {values.serverRequestSent && <Loading/>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className="myButton p-1 mt-2">Create Profile</button>
            <EncryptionMessage/>
        </div>
    </form>
    </Base>
  )
}

export default CreateProfile