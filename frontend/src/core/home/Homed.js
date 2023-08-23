import React, { Fragment, useEffect, useState } from "react";

import logo from "../../media/LogoTransparent.png"
import menu from '../../media/list.svg'
import close from "../../media/close.svg"
import languageIcon from "../../media/language.svg"
// import Loading from "../Loading";
import Menu from "../Menu";
import Footer from '../Footer';
import Home from './Home';
import { isAuthenticated } from "../../apiCalls/authUser";
import { useNavigate } from "react-router-dom";

import ReCAPTCHA from "react-google-recaptcha";
import variable from '../../variable'
import homed from './Homed.css'

const Homed = ({children}) => {

    const recaptchaRef = React.useRef();
    const navigate = useNavigate();
    const authResult = isAuthenticated();

    const pathName = window.location.pathname

    const [isVisible, setIsVisible] = useState({visibility: false, menu: menu});
    const [values, setValues] = useState({
        recaptchaValue: ''
    })

    const changeVisibility = (event) => {
        setIsVisible({visibility:!isVisible.visibility,
            menu: isVisible.visibility? menu: close
        });
    }

    const onProfile = (e) => {
        e.preventDefault();
        if(authResult){
            navigate('/user/profile/edit')
        }
    }

    const onUserHome = () => {
        if(authResult){
            if(pathName!='/user/home')
                navigate('/user/home')
        }else{
            navigate('/auth/signin', {replace: true})
        }
    }

    const onCreateProfile = (e) => {
        e.preventDefault();
        if(authResult){
            navigate('/user/profile/create')
        }else{
            navigate('/auth/signin', {replace: true})
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        if(!authResult){
            navigate('/auth/signin')
        }
    }

    // const onSignup = (e) => {
    //     e.preventDefault();
    //     if(!authResult){
    //         navigate('/auth/signup')
    //     }
    // }

    const onChangeReCAPTCHA = async () => {
        setValues({...values, recaptchaValue: recaptchaRef.current.getValue()})
        // const recaptchaToken = await recaptchaRef.current.executeAsync();
        // recaptchaRef.reset();
        // apply to form data
    }
    
    return (
        <Fragment>
        <div>
            {<Menu isVisible={isVisible.visibility} changeVisibilityInParent={changeVisibility}/>}
        </div>
        <div className="">
            <div className=" sticky-top" style={{backgroundColor:"#000"}}>
            <header className="d-flex justify-content-between text-light">
                <div className="" style={{marginLeft:"10px", minHeight:"8vh", minWidth:"8vh", backgroundImage:`url(${logo})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                <div className="d-flex">
                    {authResult? 
                    <div className="home_profile align-self-center m-2">
                        
                        {authResult.isProfile?
                            (
                            // <a onClick={onProfile} style={pathName=='/user/profile/edit'? {display:'none'}:{}}>Edit Profile</a>
                            <a onClick={onUserHome} style={pathName=='/user/home'? {display:'none'}:{}}>Home</a>)
                            : 
                            <a onClick={onCreateProfile} style={pathName=='/user/profile/create'? {display:'none'}:{}}>Create Profile</a>
                        
                        }
                        
                        {/* {authResult.isProfile?
                            <a onClick={onProfile}>Edit Profile</a>
                            : 
                            <a onClick={onCreateProfile}>Create Profile</a>
                        
                        } */}
                    </div>: 
                    <div className="home_login align-self-center m-2"><a onClick={onLogin}>Login</a></div>}
                    <div className="m-2 align-self-center" style={{display:'none', backgroundColor:"black",minHeight:"4vh", minWidth:"4vh", backgroundImage:`url(${languageIcon})`, backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                    <div onClick={changeVisibility} className="m-1" style={{minHeight:"4vh", minWidth:"4vh", backgroundImage:`url(${isVisible.menu})`, backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                </div>
            </header>
            </div>
            
            {/* HOME */}
            
            <Home/>

            {/* <div className="text-center mt-4">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={variable.RECAPTCHA_SITE_KEY}
                    // theme= "dark"
                    onChange={onChangeReCAPTCHA}
                    onExpired = {() => {console.log("Reload captcha")}}
                    onErrored = {() => {console.log("Error while loading captcha")}}
                />
            </div> */}
            
            {/* <footer className="container-md fixed-bottom"> */}
                <div className="text-light pt-3 pb-3" style={{backgroundColor:"#000"}}>
                    <Footer/>
                </div>
            {/* </footer> */}
        </div>
        </Fragment>
    )

}

export default Homed