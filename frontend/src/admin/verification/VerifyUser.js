import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getVerificationdetails, updateVerification } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';
import Base from '../../core/Base';
import Loading from '../../core/Loading';
import VerificationItem from './VerificationItem';

const VerifyUser = () => {

  const {token, sessionId, role} = isAuthenticated();
  const {userId} = useParams()
  
  const location = useLocation();

  const navigate = useNavigate();
  
  const email = location.state.email

  const [values, setValues] = useState({
    verificationDetails: null,
    extendedProfileDetails: null,

    serverrequestSent: false,
    serverError: false,
    userName:'',
    email: ''
  })

  const preLoad = () => {
    getVerificationdetails(token,sessionId,userId)
      .then(res => {
        if(res.success){
          let details = [];
          let extendedProfile = []
          for(let key in res.verificationDetails){
              let d = [];
              d.push(key);
              d.push(res.verificationDetails[key]);
              details.push(d);
          }

          for(let key in res.extendedProfileDetails){
              let d = [];
              d.push(key);
              d.push(res.extendedProfileDetails[key]);
              extendedProfile.push(d);
          }

          setValues({...values, name: res.name, email: res.email, verificationDetails :details, extendedProfileDetails: extendedProfile})

          // setVerificationDetails(details)
        }
        else{
          console.log(res)
          alert(`Error in fetching data. \nError - ${res.error}`)
        }
      })
      .catch(err => {
        console.log(err);
        alert(`Error in fetching data. \nError - ${err.message}`)
      })
  }

  useEffect(() => {
    if(!role || !(role == process.env.REACT_APP_ADMIN || role == process.env.REACT_APP_SUPERADMIN)){
        navigate('/');
    }
    preLoad();
  },[])

//   const handleCheckboxChange = (name) => (event) => {
//     setVerificationDetails({ ...verificationDetails, [name]: event.target.checked});
// }
  const handleCheckboxChange  = (name, isChecked) => {
    let vd = [...values.verificationDetails];

    for(let i=0; i<values.verificationDetails.length; i++){
      if(values.verificationDetails[i][0] == name){
        vd[i][1] = isChecked;
        setValues({...values, verificationDetails:vd});
        break;
      }
    }

  }

  const onVerify = () => {

    setValues({...values, serverrequestSent: true, serverError: false});
    let body = {};
    for(let i in values.verificationDetails){
      body[values.verificationDetails[i][0]] = values.verificationDetails[i][1]
    }

    updateVerification(token, sessionId, userId, {updatedVerification: body})
      .then(res => {
        if(res.success){
          alert(`${res.message}\nYou will be redirected to All Details Page.`);
          navigate(`/admin/users/allDetails/${userId}`)
          // setValues({...values, serverrequestSent: false, serverError: false});
        }else{
          setValues({...values, serverrequestSent: false, serverError: res.error});
        }
      })
      .catch(err => {
        console.log(err);
        setValues({...values, serverrequestSent: false, serverError: err.message});
      })
  }


  // console.log(verificationId)
  // console.log(verificationDetails)
  return (
    <Base>
      <h1 className='text-center p-4'>Verification page</h1>

      {values.verificationDetails == null ? <Loading/> : 
      
      <>
        <div className='mb-5'>
          {/* <h4>Verify details of user</h4> */}
          <div className='mt-3'>Name: <span style={{fontSize:'20px', fontWeight: '500'}}>{values.name}</span></div>
          <div>Email: <span style={{fontSize:'20px', fontWeight: '500'}}>{values.email}</span></div>
        </div>

      {values.verificationDetails.map((i,index) => {
        return (
          <VerificationItem key={index} handleCheckboxChange={handleCheckboxChange} 
            idx={index}
            isVerified={i[1]}
            // id={i[0]}
            isChecked={i[1]}
            name={i[0]}
            value={values.extendedProfileDetails[index][1]}
            />
        )
      })}
      
      {values.serverError? <div className='m-3 p-2 text-center' style={{backgroundColor:'#facbc8', borderRadius:'10px'}}>
          {values.serverError}
      </div>: <></>}

      <div className='text-center'>
        {values.serverrequestSent? <Loading/>: <></>}
        <button disabled={values.serverrequestSent} onClick={onVerify} className='btn btn-success w-50 mt-5'>Verify</button>
      </div>
      </>

      // <div style={{display:'flex', justifyContent: "space-between"}}>
      //   <div>First Name</div>
      //   <div>{verificationDetails.firstName? "Verified": "Not Verified"}</div>
      //   <div className="form-check" style={{}}>
      //       <input onChange={handleCheckboxChange('firstName')} checked={verificationDetails.firstName} className="form-check-input" type="checkbox" value="" id={`firstName`}/>
      //       <label className="form-check-label text-muted" htmlFor={`firstName`}>
      //           {`First name verified ?`}
      //       </label>
      //   </div>
      // </div>
      
      }
    </Base>
  )
}

export default VerifyUser;