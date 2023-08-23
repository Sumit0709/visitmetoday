import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUserDetailsToUpdate, updateBasicProfile, updateExtendedProfile } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';
import Base from '../../core/Base';
import Loading from '../../core/Loading';

const UpdateUser = () => {

  const {userId} = useParams();
  const {token, sessionId} = isAuthenticated();

  const [values, setValues] = useState({
    basicProfile: null,
    extendedProfile: null,

    countries: [],
    mobileNumberCountryCode: [],

    basicProfileRequestSent: false,
    basicProfileError: false,

    extendedProfileRequestSent: false,
    extendedProfileError: false,

    serverRequestSent: true,
    serverError: false,
  })

  useEffect(() => {
    getUserDetailsToUpdate(token, sessionId, userId)
      .then(res => {
        if(res.success){
          let basic = [];
          let extended = [];

          
          for(let key in res.basicProfile){
            let b = [];
            b.push(key);
            b.push(res.basicProfile[key]);
            basic.push(b);
          }

          // console.log(basic);

          

          for(let key in res.extendedProfile){
            let e = [];
            e.push(key);
            e.push(res.extendedProfile[key])
            extended.push(e);
          }

          setValues({...values, mobileNumberCountryCode: res.mobileNumberCountryCode, countries: res.countries, basicProfile: basic, extendedProfile: extended, serverError: false, serverRequestSent: false})
        }else{
          setValues({...values, serverError: res.error, serverRequestSent: false});
        }

      })
      .catch(err => {
        setValues({...values, serverError: `Catch - ${err.message}`, serverRequestSent: false});
        console.log(err.message)
      })
  }, [])

  const onBasicProfileChange = (name) => (e) => {
    let basic = [...values.basicProfile]

    for(let i=0; i<values.basicProfile.length; i++){
      if(values.basicProfile[i][0] == name){
        basic[i][1] = e.target.value;
        setValues({...values, basicProfile: basic});
      }
    }
  }
  
  const onExtendedProfileChange = (name) => (e) => {
    let extended = [...values.extendedProfile]

    for(let i=0; i<values.extendedProfile.length; i++){
      if(values.extendedProfile[i][0] == name){
        extended[i][1] = e.target.value;
        setValues({...values, extendedProfile: extended});
      }
    }
  }

  const onUpdateBasicProfile = () => {

    setValues({...values, basicProfileRequestSent: true, basicProfileError: false});

    let body = {};
    for(let i in values.basicProfile){
      body[values.basicProfile[i][0]] = values.basicProfile[i][1]
    }
    // console.log(body);

    updateBasicProfile(token, sessionId, userId,body)
    .then(res => {
      
      if(res.success){
        alert("Basic profile updated successfully");
        setValues({...values, basicProfileRequestSent: false, basicProfileError: false});
      }
      else{
        // alert("Basic profile updated successfully");
        setValues({...values, basicProfileRequestSent: false, basicProfileError: res.error});
      }
    })
    .catch(err => {
        setValues({...values, basicProfileRequestSent: false, basicProfileError: err.message});
    })
  }

  const onUpdateExtendedProfile = () => {
    
    setValues({...values, extendedProfileRequestSent: true, extendedProfileError: false});

    let body = {};
    for(let i in values.extendedProfile){
      body[values.extendedProfile[i][0]] = values.extendedProfile[i][1]
    }

    updateExtendedProfile(token, sessionId, userId, body)
      .then(res => {
        if(res.success){
          alert("Extended profile updated successfully");
          setValues({...values, extendedProfileRequestSent: false, extendedProfileError: false});
        }
        else{
          setValues({...values, extendedProfileRequestSent: false, extendedProfileError: res.error});
        }
      })  
      .catch(err => {
        setValues({...values, extendedProfileRequestSent: false, extendedProfileError: err.message});
      })
  }

  return (
    <Base>
        <h1 className='text-center'>Update User</h1>
        {values.serverRequestSent? <Loading/> : 
          <div>
            {values.basicProfile.map((basic, idx) => {
              return (
                <div className='form-group' key={idx}>
                  <label htmlFor={basic[0]}>{basic[0]}</label>
                  {/* GENDER */}
                  {basic[0] == 'gender'? 
                    <select onChange={onBasicProfileChange("gender")} className="form-control" id={basic[0]} value={basic[1]}>
                      <option value={100}>Select Gender</option>
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                      <option value={2}>Others</option>
                  </select> :
                  
                  // COUNTRY
                  basic[0] == 'country'? 
                  <div className="">
                      <select onChange={onBasicProfileChange("country")} className="form-control" id={basic[0]} value={basic[1]}>
                      {values.countries.map((c,index)=>{
                          return (
                              <option key={index} value={index}>{c}</option>
                              )
                          })}
                      </select>
                  </div> :

                  <input className="form-control" onChange={onBasicProfileChange(basic[0])} type='text' id={basic[0]} value={basic[1]}></input>
                  }
                </div>
              )
            })}

            {values.basicProfileRequestSent? <Loading/> : <></>}
            {values.basicProfileError? <div className='mt-3 p-2 text-center' style={{backgroundColor:'#facbc8', borderRadius:'10px'}}>{values.basicProfileError}</div>: <></>}
            <button onClick={onUpdateBasicProfile} className='btn btn-success mt-3 mb-5 w-50'>Update Basic Profile</button>


            {values.extendedProfile.map((extended, idx) => {
              return (
                <div className='form-group' key={idx}>
                  <label htmlFor={extended[0]}>{extended[0]}</label>
                  {
                    (extended[0] == 'whatsappCountryCode' || extended[0] == 'contactNumberCountryCode')
                    ? 
                    <select onChange={onExtendedProfileChange(extended[0])} value={extended[1]} id={extended[0]} className="form-control">
                        {values.mobileNumberCountryCode.map((countryCode, index) => {
                            return (
                                <option key={index} value={index}>{countryCode}</option>
                            )
                        })}
                    </select>
                      :
                    <input onChange={onExtendedProfileChange(extended[0])} className="form-control" type='text' id={extended[0]} value={extended[1]}></input>
                  }    
                </div>
              )
            })}

            {values.basicProfileRequestSent? <Loading/> : <></>}
            {values.extendedProfileError? <div className='mt-3 p-2 text-center' style={{backgroundColor:'#facbc8', borderRadius:'10px'}}>{values.extendedProfileError}</div>: <></>}
            <button onClick={onUpdateExtendedProfile} className='btn btn-success mt-5 mb-5 w-50'>Update Extended Profile</button>
          </div>
        }
    </Base>
  )
}

export default UpdateUser;
