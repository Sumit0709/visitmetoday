import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated, isPlanValid } from '../apiCalls/authUser'
import { getCountryAndCodeList } from '../apiCalls/inputList';
import { createCard, createProfessionalCard, createProfessionalProfile, createProfile, doesProfessionalProfileExist, getProfessionalProfile, updateCard } from '../apiCalls/profile'

import CommonCss from '../core/CommonCss.css'
import EncryptionMessage from '../core/EncryptionMessage';
import InputFile from '../core/InputFile';
import Loading from '../core/Loading';

import { isValidAge, isValidFirstName, isValidLastName, isValidMiddleName, isValidMotto, isValidPersonality, isValidPhoto, isValidSince } from '../validationCheck/validate';
import Base from '../core/Base';

const CreateProfessionalProfile = () => {    

    const navigate = useNavigate();
    const {role, sessionId, token, email} = isAuthenticated();

    // console.log("Create Profile")
    const [values, setValues] = useState({
        companyFirstName: "",
        companyFirstNameError: false,
        companyMiddleName: "",
        companyMiddleNameError: false,
        companyLastName: "",
        companyLastNameError: false,
        sellOnline: 100,
        sellOnlineError: false,
        since: "",
        sinceError: false,
        country: 0,
        dealsIn: "",
        dealsInError: false,
        servesInArea: "",
        servesInAreaError: false,
        photo: null,
        photoError: false,
        error: "" ,
        loading: false,
        countries: ['Loading...'],
        formData: new FormData(),

        serverError: false,
        serverRequestSent: false
    })

    const {companyFirstName, companyMiddleName, companyLastName, sellOnline, since, country, dealsIn, servesInArea, photo, error, loading, countries, formData} = values
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
        formData.set("country",country)

        doesProfessionalProfileExist(token, sessionId)
        .then(result => {
            console.log(result);
            if(result.success){
                navigate('/user/profile/b/edit', {replace: true});
            }
            else{
                preLoad()
            }
        })
        .catch(err => {
            setValues({...values, countries: ['Loading Failed...']})
        })
         //will be called in all cases because if it's not validating now, then it will validate while creating profile
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

        if(!isValidFirstName(companyFirstName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, companyFirstNameError: 'first name should be 2-20 char long'}
        }
        if(!isValidMiddleName(companyMiddleName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, companyMiddleNameError: 'middle name should be 2-20 char long'}
        }
        if(!isValidLastName(companyLastName.trim())){
            isErrorFound = true;
            errorObject = {...errorObject, companyLastNameError: 'last name should be 2-20 char long'}
        }
        if(!isValidSince(since)){
            isErrorFound = true;
            errorObject = {...errorObject, sinceError: 'It should be after 1000 and before future'}
        }
        if(!isValidMotto(dealsIn)){
            isErrorFound = true;
            errorObject = {...errorObject, dealsInError: 'dealsIn should be under 50 char'}
        }
        if(!isValidPersonality(servesInArea)){
            isErrorFound = true;
            errorObject = {...errorObject, servesInAreaError: 'should be under 50 char'}
        }
        if(sellOnline<0 || sellOnline>2){
            isErrorFound = true;
            errorObject = {...errorObject, sellOnlineError: 'Select Yes or No'}   
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
        console.log(formData);

        setValues({...values, serverRequestSent: true, serverError: false});

        createProfessionalProfile(token,sessionId,formData)
            .then(response => {
                console.log(response);
                if(response.success){
                    console.log("Profile created")
                    authenticate({"token": token, "sessionId": sessionId, "role":role, "isProfile": true, "email":email }, ()=>{
                        // console.log("DONE")
                        onCreateProfessionalCard();
                        // onUpdateCard();
                        // performRedirect();
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

    const onCreateProfessionalCard = () => {
        createProfessionalCard(token,sessionId)
        .then(result => {
            window.location.reload(false);
        })
        .catch(err => {
            window.location.reload(false);
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
            <label htmlFor="companyFirstName" className="col-sm-3 col-form-label">Company Name<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("companyFirstName")} className="form-control" id="companyFirstName" placeholder="Enter Your Company's Name" value={companyFirstName}/>
                { <div style={values.companyFirstNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.companyFirstNameError}</div>}
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="companyMiddleName" className="col-sm-3 col-form-label">Company Name (continue)</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("companyMiddleName")} className="form-control" id="companyMiddleName" placeholder="Continue..." value={companyMiddleName}/>
                { <div style={values.companyMiddleNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.companyMiddleNameError}</div>}
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="companyLastName" className="col-sm-3 col-form-label">Company Name (continue)</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("companyLastName")} className="form-control" id="companyLastName" placeholder="Continue..." value={companyLastName}/>
                { <div style={values.companyLastNameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.companyLastNameError}</div>}
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

        <div className="form-group row mt-4">
            <label htmlFor="since" className="col-sm-3 col-form-label">Company Established in ?<span style={{color: 'red', fontWeight: '800'}}>*</span></label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input type="text" onChange={handleChange("since")} className="form-control" id="since" placeholder="The Year on which your business started" value={since}/>
                { <div style={values.sinceError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.sinceError}</div>}
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
            <label htmlFor="dealsIn" className='col-md-3'>Deals In</label> 
            <div className="col-sm-7 col-md-6 col-lg-5">
            <textarea onChange={handleChange("dealsIn")} className="form-control" id="dealsIn" rows="1" value={dealsIn}></textarea>
            { <div style={values.dealsInError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.dealsInError}</div>}
            </div>
        </div>
        <div className="form-group mt-4 row">
            <label htmlFor="servesInArea" className='col-md-3'>Serves in (Area/ City/ State)</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
            <textarea onChange={handleChange("servesInArea")} className="form-control" id="servesInArea" rows="2" value={servesInArea}></textarea>
            { <div style={values.servesInAreaError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.servesInAreaError}</div>}
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
        
        {/* <div className='mt-4'><strong>Note: </strong>Name, Establish Year, Age, Country can not be changed after you create profile, so make sure that they are correct.</div> */}
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

export default CreateProfessionalProfile