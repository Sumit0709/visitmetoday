import React, { useEffect, useState } from 'react'
import Base from '../core/Base';
import CardSection from '../core/CardSection';

import view_analysis from '../media/view_analysis.svg'
import CardSectionHeading from '../core/CardSectionHeading';
import { getProfile, getViewAnalysis } from '../apiCalls/profile';
import { isAuthenticated } from '../apiCalls/authUser';
import Loading from '../core/Loading';


const ViewsAnalysis = () => {

    const [values, setValues] = useState({
        profileVisitCount: 0,

        serverRequestSent: true,
        serverSuccess: false,
        serverError: false
    });
    const {token, sessionId} = isAuthenticated();

    useEffect(() => {
        getViewAnalysis(token, sessionId)
            .then(res => {
                if(res.success){
                    setValues({...values, profileVisitCount: res.profileVisitCount, serverRequestSent: false, serverSuccess: true, serverError: false});
                }
                else{
                    setValues({...values, profileVisitCount: 0, serverRequestSent: false, serverSuccess: false, serverError: res.error});
                }
            })
            .catch(err => {
                setValues({...values, profileVisitCount: 0, serverRequestSent: false, serverSuccess: false, serverError: "Somethig went wrong!"});
            })
    },[])

  return (
    <Base>
        <CardSectionHeading src={view_analysis} heading={'View Analysis'}/>
        {
            values.serverRequestSent? 
            <Loading/>
            :
            <div className="text-center mt-5" style={{fontWeight:'500'}}>Your Profile has <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500", fontSize:'1.5rem'}}>{values.profileVisitCount}</span> Visitor.</div>     
        }
        {
            values.serverError && <div className='text-center' style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>
        }
    </Base>
  )
}

export default ViewsAnalysis;