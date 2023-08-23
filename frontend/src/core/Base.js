import React, { Fragment, useState } from "react";

import logo from "../media/LogoTransparent.png"
import menu from '../media/list.svg'
import close from "../media/close.svg"
import languageIcon from "../media/language.svg"
import Loading from "./Loading";
import Menu from "./Menu";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../apiCalls/authUser";

import './Base.css'

const Base = ({children}) => {

    const navigate = useNavigate();
    const authResult = isAuthenticated();

    const pathName = window.location.pathname
    // console.log(pathName)

    const [isVisible, setIsVisible] = useState({visibility: false, menu: menu});

    const changeVisibility = (event) => {
        setIsVisible({visibility:!isVisible.visibility,
            menu: isVisible.visibility? menu: close
        });
    }

    const onProfile = () => {
        if(authResult){
            if(pathName!='/user/profile/edit')
                navigate('/user/profile/edit')
        }else{
            navigate('/auth/signin', {replace: true})
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

    const onCreateProfile = () => {
        if(authResult){
            if(pathName!='/user/profile/create')
                navigate('/user/profile/create')
        }else{
            navigate('/auth/signin', {replace: true})
        }
    }

    const onHome = () => {
        navigate('/')
    }

    return (
        <Fragment>
        <div>
            {<Menu isVisible={isVisible.visibility} changeVisibilityInParent={changeVisibility}/>}
        </div>
        <div className="container-fluid">
            <div className="row sticky-top" style={{backgroundColor:"#000"}}>
            <header className="d-flex justify-content-between text-light">
                <div onClick={onHome} className="base_logo" style={{marginLeft:"0px", minHeight:"8vh", minWidth:"8vh", backgroundImage:`url(${logo})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                <div className="d-flex">
                {authResult? 
                    <div className="base_profile align-self-center m-2">
                        {authResult.isProfile?
                            (<>
                                {/* <a onClick={onProfile} style={pathName=='/user/profile/edit'? {display:'none'}:{}}>Edit Profile</a>
                                <div style={{width: '100px', backgroundColor:'red'}}></div> */}
                                <a onClick={onUserHome} style={pathName=='/user/home'? {display:'none'}:{}}>Home</a>
                            </>)
                            :
                            <a onClick={onCreateProfile} style={pathName=='/user/profile/create'? {display:'none'}:{}}>Create Profile</a>
                        
                        }
                    </div>: <></>}
                    <div className="m-2 align-self-center" style={{display:'none', backgroundColor:"black",minHeight:"4vh", minWidth:"4vh", backgroundImage:`url(${languageIcon})`, backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                    <div onClick={changeVisibility} className="m-1" style={{minHeight:"4vh", minWidth:"4vh", backgroundImage:`url(${isVisible.menu})`, backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
                </div>
            </header>
            </div>
            
            {/* <header className="row text-light pt-3 pb-3 sticky-top" style={{backgroundColor:"#000" ,minHeight:"9vh"}}>
                <div className="col-1" style={{backgroundImage:`url(${logo})`, backgroundSize:"contain", backgroundRepeat:"no-repeat"}}></div>
                <div className="col-3"></div>
                <div className="col-6 text-end">language</div>
                <div className="col-2 text-end" style={{width:"matchParent", height:"matchParent", backgroundImage:`url(${menu})`, backgroundRepeat:"no-repeat", backgroundPositionX:"center"}}></div>
            </header> */}
            
            
            <main className="pb-4" style={{minHeight:"100vh", maxWidth: "80%", margin:"auto"}}>
                {children}
            </main>
            
            
            {/* <footer className="container-md fixed-bottom"> */}
                <div className="row text-light pt-3 pb-3" style={{backgroundColor:"#000"}}>
                    <Footer/>
                </div>
            {/* </footer> */}
        </div>
        </Fragment>
    )

}

export default Base