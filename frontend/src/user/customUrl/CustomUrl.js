import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../apiCalls/authUser'
import { getProfileUrl } from '../../apiCalls/profile'
import Loading from '../../core/Loading';

import variable from '../../variable'
import customUrlCss from './CustomUrl.css'

const CustomUrl = () => {
  
    const navigate = useNavigate();
    const {sessionId} = isAuthenticated();

    const [userName, setUserName] = useState(null);

    const getUserName = () => {
        getProfileUrl(sessionId)
            .then(data => {
                if(data.success){
                    setUserName(data.url)
                }
            })
    }

    useEffect(() => {
        getUserName();
    })


    const onSubmit = (event) => {
        event.preventDefault();
        navigate('edit/userName', {state: {userName}})
    }

    const visitProfile = () => {
        navigate(`/${userName}`)
    }

return (
    <div>
        {
            userName == null? <Loading/>:
            <div className="text-center">
                <span style={{ fontSize:"1rem" }}>Your Current {variable.domain} profile link is </span>
                {/* <span onClick={visitProfile} style={{color: "#abc", fontWeight: "500"}}>{userName}</span> */}
                <span onClick={visitProfile} style={{textDecoration: "none", color: "#abc", fontWeight: "500"}} className='custom_url_profile_link cursor_pointer'>{userName}</span>
            </div>
        }
        <div className="text-center mt-4">
            <button onClick={onSubmit} className="myButton">Click to update your profile link</button>
        </div>
        <hr className='mt-4'/>
    </div>
  )
}

export default CustomUrl;