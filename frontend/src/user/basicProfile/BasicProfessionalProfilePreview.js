import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import { isAuthenticated } from '../../apiCalls/authUser'
import { updateBasicProfile } from '../../apiCalls/profile'
import {getCountryAndCodeList} from "../../apiCalls/inputList"

import CommonCss from '../../core/CommonCss.css'

const BasicProfessionalProfilePreview = ({basicProfile}) => {
    // console.log(basicProfile)
    const navigate = useNavigate();
    const [values, setValues] = useState({
        companyFirstName: basicProfile.companyFirstName,
        companyMiddleName: basicProfile.companyMiddleName? basicProfile.companyMiddleName: "",
        companyLastName: basicProfile.companyLastName? basicProfile.companyLastName: "",
        sellOnline: basicProfile.sellOnline,
        since: basicProfile.since,
        country: basicProfile.country,
        dealsIn: basicProfile.dealsIn? basicProfile.dealsIn: "",
        servesInArea: basicProfile.servesInArea? basicProfile.servesInArea: "",
        
        error: "" ,
        loading: false,
        countries: []
    })

    const {firstName,
        middleName,
        lastName,  
        gender,  
        age, 
        country, 
        motto, 
        personality, 
        error, loading, countries} = values

    useEffect(() => {
        getCountryAndCodeList()
            .then(data => {
                setValues({...values, countries: data.countries})
            })
    },[])
    
    const onSubmit = (event) => {
        event.preventDefault();
        
        navigate("basicProfile", {state: basicProfile})

    }

  return (
    <form>
        {/* <div className="form-group row mt-4">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                {middleName==''? <input disabled type="text" className="form-control" id="firstName" value={`${firstName} ${lastName}`}/>:
                <input disabled type="text" className="form-control" id="firstName" value={`${firstName} ${middleName} ${lastName}`}/>}
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select disabled className="form-control" id="gender" value={gender}>
                    <option value={100}>Select Gender</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Others</option>
                </select>
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="age" className="col-sm-3 col-form-label">Age</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <input disabled type="number" className="form-control" id="age" placeholder="Enter Your age (between 1 to 100)" value={age}/>
            </div>
        </div>

        <div className="form-group row mt-4">
            <label htmlFor="countrries" className="col-sm-3 col-form-label">Country</label>
            <div className="col-sm-7 col-md-6 col-lg-5">
                <select disabled className="form-control" id="countrries" value={country}>
                {countries.map((c,index)=>{
                    return (
                        <option key={index} value={index}>{c}</option>
                        )
                    })}
                </select>
            </div>
        </div>

        <div className="form-group mt-4 row">
            <label htmlFor="motto" className='col-sm-3'>Motto</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea disabled className="form-control" id="motto" rows="1" value={motto}></textarea>
            </div>
        </div>
        <div className="form-group mt-4 row">
            <label htmlFor="personality" className='col-sm-3'>Bio</label>
            <div className='col-sm-7 col-md-6 col-lg-5'>
                <textarea disabled className="form-control" id="personality" rows="1" value={personality}></textarea>
            </div>
        </div> */}

        <div className="text-center" style={{color: "#875"}}>Update country/ deals In/ serves in area</div>

        <div className="text-center mt-4">
            <button onClick={onSubmit} style={{width:'80%', maxWidth:'500px'}} className="myButton">Click to update your Business Profile</button>
        </div>
        <hr className='mt-4'/>
    </form>
  )
}

export default BasicProfessionalProfilePreview