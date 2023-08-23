import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../apiCalls/authUser'
import { getCardFromUrl, getProfileFromUrl, getProfileUrl } from '../apiCalls/profile'
import Base from '../core/Base'
import Loading from '../core/Loading'
import ProfilePhoto from './profilePhoto/ProfilePhoto'


import linkedInIcon from "./extendedProfile/icons/linkedIn.ico"
import twitterIcon from "./extendedProfile/icons/twitter.ico"
import youtubeIcon from "./extendedProfile/icons/youtube.ico"

import gitHubIcon from "./extendedProfile/icons/gitHub.ico"
import quoraIcon from "./extendedProfile/icons/quora.ico"
import spotifyIcon from "./extendedProfile/icons/spotify.ico"
import mediumIcon from "./extendedProfile/icons/medium.ico"
import facebookIcon from "./extendedProfile/icons/facebook.ico"
import instagramIcon from "./extendedProfile/icons/instagram.ico"
import snapchatIcon from "./extendedProfile/icons/snapchat.ico"
import discordIcon from "./extendedProfile/icons/discord.ico"
import twitchIcon from "./extendedProfile/icons/twitch.ico"
import vimeoIcon from "./extendedProfile/icons/vimeo.ico"
import tinderIcon from "./extendedProfile/icons/tinder.ico"
import profileEmailIcon from "./extendedProfile/icons/profileEmail.ico"
import whatsappIcon from "./extendedProfile/icons/whatsapp.ico"
import contactNumberIcon from "./extendedProfile/icons/contactNumber.ico"
import telegramIcon from "./extendedProfile/icons/telegram.ico"

import locationIcon from "./extendedProfile/icons/location.ico"
import websiteIcon from "./extendedProfile/icons/website.png"


import "./ProfilePreview.css"
import { getCountryAndCodeList } from '../apiCalls/inputList'
import Card from './customUrl/Card'
// import profile from '../../../visitmetodaybackend/api/model/profile'

import copyIcon from '../media/copy.svg'
import shareIconBlue from '../media/share_blue.svg'
import shareIcon from '../media/share.svg'
import downloadIcon from '../media/download.svg'

const ProfilePreview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {profileUrl} = useParams();

    const urlToBeCopied = 'https://' + window.location.hostname + window.location.pathname

    const [profileData, setProfileData] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [countries, setCountries] = useState(["Loading..."]);
    const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

    // const [cardData, setCardData] = useState({
    //     cardUrl: false,
    //     filesArray: [],
    //     shareStarted: false
    // })

    const countryCodes = ['91'];

    const genderList = ["Male", "Female", "Others"]
    // const {isImageLoaded, profileData} = values;
    
    const url = `${process.env.REACT_APP_SERVER_API}/getProfilePhotoFromUrl/${profileUrl}`

    const icons = {
        linkedIn: linkedInIcon,
        twitter: twitterIcon,
        youtube: youtubeIcon,
        gitHub: gitHubIcon,
        quora: quoraIcon,
        spotify: spotifyIcon,
        medium: mediumIcon,
        facebook: facebookIcon,
        instagram: instagramIcon,
        snapchat: snapchatIcon,
        discord: discordIcon,
        twitch: twitchIcon,
        vimeo: vimeoIcon,
        tinder: tinderIcon,
        profileEmail: profileEmailIcon,
        whatsapp: whatsappIcon,
        contactNumber: contactNumberIcon,
        telegram: telegramIcon,

        location: locationIcon,
        website: websiteIcon,
    }

    const loadProfile = async () => {
        getProfileFromUrl(profileUrl)
            .then(data => {
                if(data.success){
                    // console.log(data);
                    setProfileData(data.profile)
                }else{

                    // window.alert('Profile doesnot exist')
                    navigate('/user/404',{replace: true})
                }
            })
            .catch(err => {
                console.log(err.message)
                setProfileData({success: false})
            })
    }


    // const onGetCardFromUrl = async () => {
    //     getCardFromUrl(profileUrl)
    //     .then(blob => {
    //         if(blob && blob.success == false){
    //             setCardData({
    //                 ...cardData,
    //                 cardUrl: false
    //             })
    //         }
    //         else{
    //             const objectURL = URL.createObjectURL(blob);
    //             var file = new File([blob], "card.png", {type: 'image/png'});
    //             var tempFiles = [file];


    //             setCardData({
    //                 ...cardData,
    //                 cardUrl: objectURL,
    //                 filesArray: tempFiles
    //             })
    //             // setValues({error: false, cardUrl: objectURL, filesArray: tempFiles, isVerdictGiven: true, cardRequestSent: false, referalCode: referalCode, visitCounter: visitCounter})
    //         }
    //     })
    //     .catch(err=> {
            
    //     })
    // }

    useEffect(() => {
        getCountryAndCodeList()
            .then(data => {
                setCountries(data.countries)
            })
        loadProfile();
        // onGetCardFromUrl();
        // getExtendedProfileList()
        //     .then(data => {
        //         setValues({...values, extendedProfiles: data.extendedProfiles});
        //     })   
    },[])

    const onShareProfileUrl = async () => {
        

        if(navigator.share){

            navigator.share({
              title: 'my pofile link',
              // url: `https://visitme.today`,
              text: `Hi there.\nThis is my E-Visiting profile ${urlToBeCopied}. \nWant your own E-Visiting Card? visit https://visitme.today or Whatsapp or Call Mr. CS on +919801757888`,
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







        // try {
        //     await navigator.clipboard.writeText(`My Profile link :${urlToBeCopied}. Want your own visitme.today E-Visiting Card ? Whatsapp or Call Mr. CS on +918894112513 `);

        //     setIsCopiedToClipboard(true);
        //     setTimeout(() => {
        //         setIsCopiedToClipboard(false);
        //     }, 2000);
            
        // } catch (err) {
        //     console.log(err.message)
        // }
    }

    // const onCopyToClipboardReferalCode = async () => {
    //     try {
    //         await navigator.clipboard.writeText(`Use my referral code ${profileData.referalCode}.\nWant your own visitme.today E-Visiting Card ? Whatsapp or Call Mr. CS on +918894112513`);

    //         setIsCopiedToClipboard(true);
    //         setTimeout(() => {
    //             setIsCopiedToClipboard(false);
    //         }, 2000);
            
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    // const onShareCard = () => {
    //     setCardData({...cardData, shareStarted: true})
    //     if(navigator.share){
    
    //       navigator.share({
    //         title: 'Visiting Card',
    //         // url: `https://visitme.today`,
    //         text: 'Want your own E-Visiting Card? visit https://visitme.today or Whatsapp or Call Mr. CS on +918894112513',
    //         files: cardData.filesArray
    //       }).then(() => {
    //         // console.log('Thanks for sharing')
    //         setCardData({...cardData, shareStarted: false})
    //       })
    //       .catch(err => {
    //         // console.log(err)
    //         setCardData({...cardData, shareStarted: false})
    //       })
    //     }else{
    //     //   console.log('Sharing not supported')
    //       setCardData({...cardData, shareStarted: false})
    //       alert('Sharing is not supported in your device!')
    //     }
    //   }

    const onGetMyVisitingCard = () => {
        navigate(`/${profileUrl}/card`)
    }

    const iconWidth = "35px"
    const iconHeight = "35px"

  return (
    <Base>
        {/* Profile Photo */}
        <div className="mt-3" style={{height:"150px", width:"150px", margin:"auto", borderRadius:"50% 50%"}}>
            {
                isImageLoaded? null: <Loading/>
            }
            <img style={isImageLoaded? {height:"150px", width:"150px", objectFit:"cover", borderRadius: "50% 50%"}: {display: "none"}} src={url}
                onLoad = {() => {setIsImageLoaded(true)}}
            />
        </div>

        {
            profileData == null ? <Loading/> :
            profileData.success == false? 
            <div className='text-center mt-5 mb-5' style={{color: 'red', fontWeight: '500'}}>{'Something went wrong !'}</div>
            : 
        <>
        <div className='text-center mt-4' style={{width: '80%', maxWidth:'400px', margin:'auto'}}>
            <strong>{profileData.personality}</strong>
        </div>
        {/* <div className='text-center mt-4'>
                <button onClick={onCopyToClipboardReferalCode} className="preview_copyText btn p-2" style={{fontSize:"0.9rem" , width:"85%", maxWidth:"375px", borderWidth:"2px", borderColor:"#eee"}} data-toggle="tooltip" data-placement="top" title="Click to copy">{`Referral Code: ${profileData.referalCode}`} <img style={{width:"25px", height:"25px", alignItems:'baseline'}} src={copyIcon}/></button>
        </div> */}
        { document.queryCommandSupported('copy') && 
        <div className='profile-copy-button text-center mt-2'>
            <div className='text-center'>
                <button onClick={onShareProfileUrl} className="preview_copyText btn p-2" style={{fontSize:"0.9rem" , width:"85%", maxWidth:"375px", borderWidth:"2px", borderColor:"#eee"}} data-toggle="tooltip" data-placement="top" title="Click to share">{`Share my Profile`} <img style={{width:"25px", height:"25px", alignItems:'baseline'}} src={shareIconBlue}/></button>
            </div>
            <small className='text-muted'>Click to share my E-Visiting profile link</small>
            {<div style={isCopiedToClipboard? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{'successfully copied to clipboard'}</div>}     
        </div>
        }  
        <div className='preview_container'>
            <div className='preview_basic'>
                <div className="preview_basic_title">Basic Details</div>
                <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Name :"}</div>
                    <div className='preview_basic_item_value'>{`${profileData.firstName} ${profileData.middleName} ${profileData.lastName}`}</div>
                </div>
                {/* <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Middle Name :"}</div>
                    <div className='preview_basic_item_value'>{profileData.middleName}</div>
                </div>
                <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Last Name :"}</div>
                    <div className='preview_basic_item_value'>{profileData.lastName}</div>
                </div> */}
                <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Gender :"}</div>
                    <div className='preview_basic_item_value'>{genderList[profileData.gender]}</div>
                </div>
                {/* <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Age :"}</div>
                    <div className='preview_basic_item_value'>{profileData.age}</div>
                </div> */}
                <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Country :"}</div>
                    <div className='preview_basic_item_value'>{countries[profileData.country]}</div>
                </div>
                { (!profileData.motto || profileData.motto == "")? <></> :
                <div className='preview_basic_item'>
                    {/* CHANGED MOTTO -> PERSONALITY */}
                    <div className='preview_basic_item_title'>{"Personality :"}</div>
                    <div className='preview_basic_item_value'>{profileData.motto}</div>
                </div>
                }
                {/* { (!profileData.personality || profileData.personality == "")? <></> :
                <div className='preview_basic_item'>
                    <div className='preview_basic_item_title'>{"Bio :"}</div>
                    <div className='preview_basic_item_value'>{profileData.personality}</div>
                </div>
                } */}
            </div>
            <div className='preview_extended'>
                <div className="preview_extended_title">Let's get in touch</div>
                {/* EXTENDED */}
                <div className='preview_extended_value'>
                {profileData.facebook? <a href={profileData.facebook} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.facebook} /></a>: <></>}
                {profileData.instagram? <a href={profileData.instagram} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.instagram} /></a>: <></>}
                {profileData.linkedIn? <a href={profileData.linkedIn} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.linkedIn} /></a>: <></>}
                {profileData.twitter? <a href={profileData.twitter} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.twitter} /></a>: <></>}
                {profileData.youtube? <a href={profileData.youtube} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.youtube} /></a>: <></>}
                {profileData.gitHub? <a href={profileData.gitHub} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.gitHub} /></a>: <></>}
                {profileData.quora? <a href={profileData.quora} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.quora} /></a>: <></>}
                {profileData.spotify? <a href={profileData.spotify} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.spotify} /></a>: <></>}
                {profileData.medium? <a href={profileData.medium} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.medium} /></a>: <></>}
                {profileData.snapchat? <a href={profileData.snapchat} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.snapchat} /></a>: <></>}
                {profileData.discord? <a href={profileData.discord} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.discord} /></a>: <></>}
                {profileData.twitch? <a href={profileData.twitch} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.twitch} /></a>: <></>}
                {profileData.vimeo? <a href={profileData.vimeo} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.vimeo} /></a>: <></>}
                {profileData.tinder? <a href={profileData.tinder} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.tinder} /></a>: <></>}
                {profileData.telegram? <a href={profileData.telegram} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.telegram} /></a>: <></>}
                
                {/* {profileData.location? <a href={profileData.location} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.location} /></a>: <></>} */}
                {profileData.website? <a href={profileData.website} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.website} /></a>: <></>}
                
                {profileData.profileEmail? <a href={`mailto:${profileData.profileEmail}`} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.profileEmail} /></a>: <></>}
                {profileData.whatsapp? <a href={`https://wa.me/${countryCodes[profileData.whatsappCountryCode]}${profileData.whatsapp}`} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.whatsapp} /></a>: <></>}
                {profileData.contactNumber? <a href={`tel:+${countryCodes[profileData.contactNumberCountryCode]}${profileData.contactNumber}`} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.contactNumber} /></a>: <></>}

                </div>
            </div>
        </div>
        <button onClick={onGetMyVisitingCard} className='btn' style={{marginTop:'40px', marginBottom:'30px', backgroundColor:'#eee', color:'black'}}><strong>Get My Visiting Card</strong></button>
        </>
        }

        {/* { cardData.cardUrl? 
            <div style={{maxWidth:'350px'}}>
                <Card url={cardData.cardUrl}/>
                <div className='text-center mt-3'>
                    <a disabled={cardData.shareStarted} style={cardData.shareStarted? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '100%', maxWidth: '350px'}: {width: '100%', maxWidth: '350px'}} className='download_card' href={cardData.cardUrl} download={profileData? `${profileData.firstName} ${profileData.lastName} E-Visiting Card`: 'E-Visiting Card'}>DOWNLOAD CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={downloadIcon}/></a>
                </div>
                <div className='text-center mt-3 mb-5'>
                <button disabled={cardData.shareStarted} onClick={onShareCard} style={cardData.shareStarted? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '100%', maxWidth: '350px', fontWeight:'500'}: {fontWeight:'500', width: '100%', maxWidth: '350px'}} className='download_card' href={cardData.cardUrl} download='visiting_card'>SHARE CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={shareIcon}/></button>
                </div>
            </div>
            : <Loading/>
        } */}
    </Base>
  )
}

export default ProfilePreview