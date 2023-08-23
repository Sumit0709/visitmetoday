import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../apiCalls/authUser'
import { createCard, createProfessionalCard, getCard, getCardFromSessionId, getProfessionalCardFromSessionId, getProfessionalReferalAndVisitCounter, getReferalAndVisitCounter, updateCard } from '../apiCalls/profile'
import Loading from '../core/Loading';
import Card from './customUrl/Card';

import copyIcon from '../media/copy.svg'
import shareIcon from '../media/share.svg'
import downloadIcon from '../media/download.svg'
import cardPage from './CardPage.css'
import Base from '../core/Base';

const ProfessionalCardPage = () => {

  const navigate = useNavigate()
  const {token,sessionId} = isAuthenticated();

  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);
  const [values, setValues] = useState({
    cardUrl: null,
    filesArray: [],
    error: false,
    shareStarted: false,
    isVerdictGiven: false,

    referalCode: 'Loading...',
    visitCounter: 0,
    userName: 'My',

    cardRequestSent: false,
    cardServerError: false,

  })

  useEffect(() => {
    if(!sessionId){
      navigate('/auth/signin', {replace: true})
    }
    onGetReferalAndVisitCounter()
    // onGetCard();
  },[])

  const onGetReferalAndVisitCounter = () => {
    setValues({...values, cardRequestSent: true})
    getProfessionalReferalAndVisitCounter(token,sessionId)
    .then(res => {
      if(res.success){
        // console.log(res.data);

        // setValues({...values, referalCode: res.data.referalCode, visitCounter: res.data.visitCounter})
        onGetCard(res.data.referalCode, res.data.visitCounter, res.data.userName);
      }
      else if(res.error == 'PLAN_EXPIRED'){
          navigate('/auth/payment');
      }
      else{
        setValues({...values, })
      }
    })
  }

  const onGetCard = (referalCode, visitCounter, userName) => {
    
    getProfessionalCardFromSessionId(sessionId)
        .then(blob => {
          if(blob && blob.success == false){
            setValues({...values, error: false, cardUrl:null, isVerdictGiven: true, cardRequestSent: false, cardServerError: blob.error, referalCode: referalCode, visitCounter: visitCounter, userName: userName})
          }
          else{
            const objectURL = URL.createObjectURL(blob);
            var file = new File([blob], "card.png", {type: 'image/png'});
            var tempFiles = [file];

            setValues({error: false, cardUrl: objectURL, filesArray: tempFiles, isVerdictGiven: true, cardRequestSent: false, referalCode: referalCode, visitCounter: visitCounter, userName: userName})
          }
        })
        .catch(err => {
          setValues({...values, cardRequestSent: false, cardServerError: 'something went wrong!', referalCode: referalCode, visitCounter: visitCounter, userName: userName})
            console.log('something went wrong')
        })
  }

  const onShare = () => {
    setValues({...values, shareStarted: true})
    if(navigator.share){

      navigator.share({
        title: 'Visiting Card',
        // url: `https://visitme.today`,
        text: 'Want your own E-Visiting Card? visit https://visitme.today or Whatsapp or Call Mr. CS on +918894112513',
        files: values.filesArray
      }).then(() => {
        // console.log('Thanks for sharing')
        setValues({...values, shareStarted: false})
      })
      .catch(err => {
        // console.log(err)
        setValues({...values, shareStarted: false})
      })
    }else{
      console.log('Sharing not supported')
      setValues({...values, shareStarted: false})
      alert('Sharing is not supported in your device!')
    }
  }
  

  const onUpdateCard = () => {
    setValues({...values, cardRequestSent: true})
    createProfessionalCard(token,sessionId)
        .then(response => {
            if(response.success){
                setValues({...values, cardRequestSent: false})
                onGetCard(values.referalCode, values.visitCounter)
                console.log("CARD UPDATED")
                // window.location.reload(false);
            }
            else if(response.error == 'PLAN_EXPIRED'){
                navigate('/auth/payment');
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

  const onReferalCopy = async () => {
    try {
        await navigator.clipboard.writeText(`Use my referral code ${values.referalCode}.\nWant your own E-Visiting Card? visit https://visitme.today or Whatsapp or Call Mr. CS on +918894112513`);

        setIsCopiedToClipboard(true);
        setTimeout(() => {
            setIsCopiedToClipboard(false);
        }, 2000);
        
    } catch (err) {
        console.log(err.message)
    }
}

const onShareInviteCode = () => {
  if(navigator.share){

    navigator.share({
      title: 'my pofile link',
      // url: `https://visitme.today`,
      text: `Use my referral code ${values.referalCode}.\nWant your own E-Visiting Card ? visit https://visitme.today Whatsapp or Call Mr. CS on +918894112513`,
    }).then(() => {
      // console.log('Thanks for sharing')
    //   setValues({...values, shareStarted: false})
    })
    .catch(err => {
      // console.log(err)
    //   setValues({...values, shareStarted: false})
    })
  }else{
    // console.log('Sharing not supported')
    // setValues({...values, shareStarted: false})
    alert('Sharing is not supported in your device!')
  }
}

  return (
    <Base>
    
          <h2 className='text-center' style={{color:"#875"}}>E-Visiting Card</h2>

          {!values.isVerdictGiven? <Loading/> : 
              <>
              <div className="text-center mt-5" style={{fontWeight:'500'}}>Your Profile has <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500", fontSize:'1.5rem'}}>{values.visitCounter}</span> Visitor.</div>              
              <div className="text-center mt-3" style={{fontWeight:'500'}}>Your Invite Code: <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500"}}>{values.referalCode}</span> <img onClick={onReferalCopy} className="edit_profile_referal_copy" style={{width:"25px", height:"25px", alignItems:'baseline'}} src={copyIcon}/></div>        
              {<div className='text-center' style={isCopiedToClipboard? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{'successfully copied to clipboard'}</div>}       
              
              <div className='text-center mt-3 mb-3'>
                <button disabled={values.shareStarted || values.cardRequestSent} onClick={onShareInviteCode} style={values.shareStarted || values.cardRequestSent? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '80%', maxWidth: '350px', fontWeight:'500'}: {fontWeight:'500', width: '80%', maxWidth: '350px'}} className='download_card' href={values.cardUrl} >SHARE INVITE CODE<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={shareIcon}/></button>
              </div>

              

              {!values.cardUrl? 
                  <div className="text-center mt-4 mb-5">
                      {values.cardRequestSent && <Loading/>}
                      <button disabled={values.cardRequestSent} onClick={onUpdateCard} className="myButton" style={values.cardRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,width:'100%',maxWidth:'350px', marginTop:'10px'}:{width:'100%',maxWidth:'350px', marginTop:'10px'}}>Create Card</button>
                  </div> :
                  <>
                  <div className='text-center mt-3'>
                    <a disabled={values.shareStarted || values.cardRequestSent} style={values.shareStarted|| values.cardRequestSent? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '80%', maxWidth: '350px'}: {width: '80%', maxWidth: '350px'}} className='download_card' href={values.cardUrl} download={`${values.userName} E-Visiting Card`}>DOWNLOAD E-Visiting CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={downloadIcon}/></a>
                  </div>
                  <div className='text-center mt-3 mb-3'>
                    <button disabled={values.shareStarted || values.cardRequestSent} onClick={onShare} style={values.shareStarted || values.cardRequestSent? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '80%', maxWidth: '350px', fontWeight:'500'}: {fontWeight:'500', width: '80%', maxWidth: '350px'}} className='download_card' href={values.cardUrl} >SHARE E-VISITING CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={shareIcon}/></button>
                  </div>

                  <hr className='mt-5 mb-5'/>

                  <Card url={values.cardUrl} />
                  { <div style={values.cardServerError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.cardServerError}</div>}
                  {/* <div className="text-center mt-4 mb-5">
                      {values.cardRequestSent && <Loading/>}
                      <button disabled={values.cardRequestSent || values.shareStarted} onClick={onUpdateCard} className="myButton" style={values.cardRequestSent || values.shareStarted?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,width:'100%',maxWidth:'350px', marginTop:'10px'}:{width:'100%',maxWidth:'350px', marginTop:'10px'}} >Update Card</button>
                  </div> */}
                  
                  </>
                  }
              </>
          }

      {/* {values.cardUrl == null? <Loading/>: 
      
      <div>
        <Card url={values.cardUrl} />
        <div className='text-center mt-5 mb-5'>
          <a style={{width: '80%', maxWidth: '350px'}} className='download_card' href={values.cardUrl} download='visiting_card'>Download</a>
        </div>
        <div className='text-center mt-5 mb-5'>
          <button disabled={values.shareStarted} onClick={onShare} style={values.shareStarted? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '80%', maxWidth: '350px'}: {width: '80%', maxWidth: '350px'}} className='myButton' href={values.cardUrl} download='visiting_card'>Share Card</button>
        </div>
      </div>  
      } */}
    </Base>
  )
}

export default ProfessionalCardPage