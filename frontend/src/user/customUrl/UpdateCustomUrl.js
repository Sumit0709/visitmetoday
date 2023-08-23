import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../apiCalls/authUser'
import { getCard, getProfileUrl, updateCard, updateCustomProfileUrl } from '../../apiCalls/profile'
import Base from '../../core/Base';
import Loading from '../../core/Loading';
import Card from './Card';

import variable from '../../variable'
import { isValidCustomUrl } from '../../validationCheck/validate';
import edit_link from '../../media/edit_link.svg'
import CardSectionHeading from '../../core/CardSectionHeading';

const UpdateCustomUrl = () => {
  
    const navigate = useNavigate();
    // const location = useLocation();

    const {sessionId, token} = isAuthenticated();

    const [userName, setUserName] = useState(null);
    // const [customUrl, setCustomUrl] = useState("");
    const [confirmationVisibility, setConfirmationVisibility] = useState("collapse")

    const [values, setValues] = useState({
        // userName: null,
        customUrl: '',
        customUrlError: false,
        confirmationVisibility: 'collapse',

        urlRequestSent: false,
        urlServerError: false,
        cardRequestSent: false,
        cardServerError: false,

        cardUrl: false,
        // verdict about whether card has been created or not
        isVerdictGiven: false,
    })

    const getUserName = async () => {
        await getProfileUrl(sessionId)
            .then(response => {
                if(response.success){
                    onGetCard(response.url)
                    setUserName(response.url)
                    // setValues({...values, userName: response.url})
                }
            })
    }

    useEffect(() => {
        const isLoggedIn = isAuthenticated();
        if(isLoggedIn == false){
            navigate('/auth/signin')
        }
        else if(!isLoggedIn.isProfile){
            navigate('/user/profile')
        }
        getUserName();
    },[])

    // const onAskConfirmation = () => {
    //     setConfirmationVisibility("visible")
    // }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Submit")
        
        if(!isValidCustomUrl(values.customUrl)){
            setValues({...values, customUrlError: 'Url should be a combination of 2-30 letters, numbers and underscore (_)'})
            return;
        }
        const customUrl = values.customUrl.trim();
        
        setValues({...values, urlRequestSent: true, urlServerError: false})

        updateCustomProfileUrl(token, sessionId,{customUrl})
            .then(response => {
                if(response.success){
                    navigate('/user/profile/edit')
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, urlRequestSent: false, urlServerError: response.error})
                    
                }
            })
            .catch(err => {
                setValues({...values, urlRequestSent: false, urlServerError: 'something went wrong'})
                console.log("Something Went wrong");
            })
        
        // closeConfirmation();
    }

    const visitProfile = () => {
        navigate(`/${userName}`) 
    }

    // const closeConfirmation = () => {
    //     setConfirmationVisibility("hidden")
    // }

    const onUpdateCard = () => {
        setValues({...values, cardRequestSent: true})
        updateCard(token,sessionId)
            .then(response => {
                if(response.success){
                    setValues({...values, cardRequestSent: false})
                    onGetCard(userName)
                    console.log("CARD UPDATED")
                    // window.location.reload(false);
                }
                else{
                    setValues({...values, cardRequestSent: false, cardServerError: response.error})
                    console.log("CARD NOT UPDATED")
                    console.log("ELSE - ")
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, cardRequestSent: false, cardServerError: 'something went wrong!'})
                console.log("CARD NOT UPDATED")
                console.log(err.message);
            })
      }

      const handleChangeUrl = (event) => {
        setValues({...values, customUrl: event.target.value, customUrlError: false, urlServerError: false})
      }

      

    const onGetCard = (userName) => {
        getCard(userName)
            .then(response => {
                setValues({...values, cardUrl: response, isVerdictGiven: true})
            })
            .catch(err => {
                console.log('something went wrong')
            })
    }

return (
    <Base>
        <CardSectionHeading src={edit_link} heading={'Update Your Profile Link'}/>
        {
        userName == null? <Loading/>:
        <div className="mt-5">
            <div className='row'>
            
            {/* <div className='col-md-6'>        
                <h2 className='text-center' style={{color:"#875"}}>E-Visiting Card</h2>

                {!values.isVerdictGiven? <Loading/> : 
                    <>
                    {!values.cardUrl? 
                        <div className="text-center mt-4 mb-5">
                            {values.cardRequestSent && <Loading/>}
                            <button disabled={values.urlRequestSent || values.cardRequestSent} onClick={onUpdateCard} className="myButton" style={values.urlRequestSent || values.cardRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,width:'100%',maxWidth:'350px', marginTop:'10px'}:{width:'100%',maxWidth:'350px', marginTop:'10px'}}>Create Card</button>
                        </div> :
                        <>
                        <Card url={values.cardUrl} profileUrl={userName}/>
                        <div className="text-center mt-4 mb-5">
                            {values.cardRequestSent && <Loading/>}
                            <button disabled={values.urlRequestSent || values.cardRequestSent} onClick={onUpdateCard} className="myButton" style={values.urlRequestSent || values.cardRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,width:'100%',maxWidth:'350px', marginTop:'10px'}:{width:'100%',maxWidth:'350px', marginTop:'10px'}} >Update Card</button>
                        </div>
                        </>
                        }
                    </>
                }
                
            </div> */}
            
            <div className='col-md-6 mb-5`'>
                <span style={{color: "#875", fontSize:"1.1rem" }}>Your Current {variable.domain} profile link is </span>
                {/* <span onClick={visitProfile} style={{color: "#abc", fontWeight: "500"}}>{userName}</span> */}
                <span className='cursor_pointer' onClick={visitProfile} style={{textDecoration: "none", color: "#abc", fontWeight: "500"}}>{userName}</span>
                
                <div className="mt-4">
                    <div className='form-group pb-3'>
                        <input onChange={handleChangeUrl} value={values.customUrl} className='form-control'/>
                        { <div style={values.customUrlError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.customUrlError}</div>}
                        <small className='form-text text-muted'>This is your E-visiting profile link. Make it unique</small>
                        {/* <div style={{color: 'red', fontWeight: '500', opacity:'0.7'}}>Changing your profile link will change your QR Code.</div> */}
                    </div>
                    { <div style={values.urlServerError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.urlServerError}</div>}
                    {values.urlRequestSent && <Loading/>}
                    <button disabled={values.urlRequestSent || values.cardRequestSent} onClick={onSubmit} style={values.urlRequestSent || values.cardRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,width:'100%',maxWidth:'100%', marginTop:'10px'}:{width:'100%',maxWidth:'100%', marginTop:'10px'}} className="myButton">Update Profile Link</button>
                </div>
            </div>

            {/* <div>

            </div> */}

            
            </div>
            
            {/* Confirmation popup */}
            {/* <div onClick={closeConfirmation} style={{backgroundColor:"black", opacity:0.7 ,visibility: confirmationVisibility, position: "fixed", left: 0, right: 0, top: 0, bottom: 0, zIndex: 99}}/>
            <div className='text-center mt-4' style={{visibility: confirmationVisibility, position: "fixed", width:"80%", top: "40%", bottom: "50%", zIndex: 100}}>
                <div className='alert alert-warning w-100'>
                        <span>Are you sure? You want to update your user name to </span>
                        <span style={{color: "#abc", fontWeight: "500"}}>{customUrl}</span>
                        <div className='text-muted'><small>NOTE: Make sure to update your Card after updating your User name</small></div>
                        <div className='row pt-3' style={{justifyContent: "space-around"}}>
                            <button onClick={closeConfirmation} className="btn btn-warning col-4">No</button>
                            <button onClick={onSubmit} className="btn btn-success col-4">Yes</button>
                        </div>
                </div>
            </div> */}
        </div>
        }
    </Base>
  )
}

export default UpdateCustomUrl;