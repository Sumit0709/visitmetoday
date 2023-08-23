import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../apiCalls/authUser';
import { getProfileUrl } from '../apiCalls/profile';
import EncryptionMessage from './EncryptionMessage';
import Loading from './Loading';

import "./Menu.css"
import Navigating from './Navigating';

const Menu = ({isVisible, changeVisibilityInParent}) => {

    const isLoggedIn = isAuthenticated();
    const {sessionId} = isAuthenticated();
    const navigate = useNavigate();

    const pathName = window.location.pathname

    const [values, setValues] = useState({
        showNavigating: false,
        signoutStarted: false,
        profilePreviewStarted: false,
    })
    const [showNavigating,setShowNavigating] = useState(false);

    let visibility = "";
    let startAmination = ""
    if(isVisible == true){
        visibility = "menu_show"
        startAmination = "menu_slide"
    }
    else if(isVisible == false){
        visibility = "menu_hide"
        startAmination = "menu_slide_back"
    }

    const onSignout = () => {
        setValues({...values, signoutStarted: true})
        // setTimeout(() => {
            
        
        signout()
            .then(response => {
                if(response.success == true){
                    console.log("Logout Successfull");
                    setValues({signoutStarted: false, showNavigating: true});
                    // setShowNavigating(true);
                    setTimeout(() => {
                        console.log("DONE")
                        // if(!(pathName=='/'))
                            navigate("/auth/signin", {replace:true})
                        // else{
                            // setValues({...values, showNavigating:false})
                        // }
                    }, 1000);

                }else{
                    setValues({...values, signoutStarted: false})
                }
            })
            .catch(err => {
                setValues({...values, signoutStarted:false})
                console.log(err);
            })
        // }, 3000);
    }

    const navigateNow = () => {
        if(values.showNavigating){
            return (
                <Navigating message={"Logout successfull"}/>
            )
        }
    }

    const changeVisibility = () => {
        changeVisibilityInParent();
    }


    const onPreviewProfile = () => {
        setValues({...values, profilePreviewStarted: true});

        getProfileUrl(sessionId)
            .then(response=> {
                if(response.success){
                    setShowNavigating(true);
                    setTimeout(() => {
                        // console.log("DONE")
                        setValues({...values, profilePreviewStarted: false})
                        navigate(`/${response.url}`);
                    }, 1000);
                }
                else{
                    setValues({...values, profilePreviewStarted: false})
                    console.log("URLnot found")
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, profilePreviewStarted: false})
                console.loog(err.message)
            })
    }

    const onCard = () => {
        navigate('/user/card')
    }

    const onRegister = () => {
        navigate('/auth/signup')
    }
    const onLogin = () => {
        navigate('/auth/signin')
    }

    const onUpdatePassword = () => {
        navigate('/update/password')
    }

  return (
    <Fragment>
    {navigateNow()}
    <div onClick={changeVisibility} className={`menu_shadow ${visibility}`}></div>
    <div className={`menu_container ${visibility} ${startAmination}`}>
        {isLoggedIn? <p>{isLoggedIn.email}</p> :<></>}
        { isLoggedIn?<></>: <p style={{color: 'black'}} className='menu_item cursor_pointer' onClick={onRegister}>Register</p>}
        { isLoggedIn?<></>: <p style={{color: 'black'}} className='menu_item cursor_pointer' onClick={onLogin}>Login</p>}

        { isLoggedIn.isProfile? <p style={{color: 'black'}} className='menu_item cursor_pointer' onClick={onPreviewProfile}>My Visiting Page</p>: <></>}

        { isLoggedIn.isProfile? <p style={{color: 'black'}} onClick={onCard} className='menu_item cursor_pointer'>My E-Visiting Card</p>: <></>}
        { isLoggedIn.isProfile? <p style={{color: 'black'}} onClick={onUpdatePassword} className='menu_item cursor_pointer'>Update Password</p>: <></>}
        {/* { isLoggedIn.isProfile? <p className='menu_item'>Share My Profile Link</p>: <></>} */}
        {/* {isLoggedIn.isProfile? <p className='menu_item'>Share My E-Visiting Card</p>: <></>} */}
        {isLoggedIn? <p style={{color: 'black'}} className='menu_item cursor_pointer' onClick={onSignout}>Logout</p>: <></>}
        {isLoggedIn? <div className="text-center" style={{visibility: values.signoutStarted || values.profilePreviewStarted? "": "hidden"}}>
            <Loading/>
        </div>: <></>
        }
        <div><EncryptionMessage/></div>
    </div>
    
    </Fragment>
  )
}

export default Menu