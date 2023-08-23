import React, { Fragment, useEffect, useState } from "react"
import { getExtendedProfileList } from "../../apiCalls/inputList"

import linkedInIcon from "./icons/linkedIn.ico"
import twitterIcon from "./icons/twitter.ico"
import youtubeIcon from "./icons/youtube.ico"

import gitHubIcon from "./icons/gitHub.ico"
import quoraIcon from "./icons/quora.ico"
import spotifyIcon from "./icons/spotify.ico"
import mediumIcon from "./icons/medium.ico"
import facebookIcon from "./icons/facebook.ico"
import instagramIcon from "./icons/instagram.ico"
import snapchatIcon from "./icons/snapchat.ico"
import discordIcon from "./icons/discord.ico"
import twitchIcon from "./icons/twitch.ico"
import vimeoIcon from "./icons/vimeo.ico"
import tinderIcon from "./icons/tinder.ico"
import profileEmailIcon from "./icons/profileEmail.ico"
import whatsappIcon from "./icons/whatsapp.ico"
import contactNumberIcon from "./icons/contactNumber.ico"
import telegramIcon from "./icons/telegram.ico"
import locationIcon from "./icons/location.ico"
import websiteIcon from "./icons/website.png"


import { updateExtendedProfessionalProfile, updateExtendedProfile } from "../../apiCalls/profile"
import { isAuthenticated } from "../../apiCalls/authUser"
import { useLocation, useNavigate } from "react-router-dom"
import Base from "../../core/Base"
import { isValidExternalEmail, isValidWhatsappOrContact } from "../../validationCheck/validate"

import CommonCss from '../../core/CommonCss.css'
import ExtendedProfileItem from "./ExtendedProfileItem"
import Loading from "../../core/Loading"

const UpdateExtendedProfessionalProfile = () => {
    
    const navigate = useNavigate();

    // console.log(extendedProfile);
    const location = useLocation()
    const extendedProfile = location.state;
    const {token, role, sessionId, isProfile} = isAuthenticated();

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

    const [list, setList] = useState({defaultLoading: true, mobileNumberCountryCodes: ["Loading..."]})

    const [values, setValues] = useState({
        linkedIn: extendedProfile.linkedIn,
        twitter: extendedProfile.twitter,
        youtube: extendedProfile.youtube,
        gitHub: extendedProfile.gitHub,
        quora: extendedProfile.quora,
        spotify: extendedProfile.spotify,
        medium: extendedProfile.medium,
        instagram: extendedProfile.instagram,
        snapchat: extendedProfile.snapchat,
        discord: extendedProfile.discord,
        twitch: extendedProfile.twitch,
        vimeo: extendedProfile.vimeo,
        tinder: extendedProfile.tinder,
        facebook: extendedProfile.facebook,
        telegram: extendedProfile.telegram,
        profileEmail: extendedProfile.profileEmail,
        whatsappCountryCode: extendedProfile.whatsappCountryCode,
        whatsapp: extendedProfile.whatsapp,
        contactNumberCountryCode: extendedProfile.contactNumberCountryCode,
        contactNumber: extendedProfile.contactNumber,
        isWhatsappAndContactNumberSame: extendedProfile.isWhatsappAndContactNumberSame,
        
        location: extendedProfile.location,
        website: extendedProfile.website,

        showLinkedIn: extendedProfile.showLinkedIn,
        showTwitter: extendedProfile.showTwitter,
        showYoutube: extendedProfile.showYoutube,
        showGitHub: extendedProfile.showGitHub,
        showQuora: extendedProfile.showQuora,
        showSpotify: extendedProfile.showSpotify,
        showMedium: extendedProfile.showMedium,
        showInstagram: extendedProfile.showInstagram,
        showSnapchat: extendedProfile.showSnapchat,
        showDiscord: extendedProfile.showDiscord,
        showTwitch: extendedProfile.showTwitch,
        showVimeo: extendedProfile.showVimeo,
        showTinder: extendedProfile.showTinder,
        showFacebook: extendedProfile.showFacebook,
        showTelegram: extendedProfile.showTelegram,
        showProfileEmail: extendedProfile.showProfileEmail,
        showWhatsapp: extendedProfile.showWhatsapp,
        showContactNumber: extendedProfile.showContactNumber,

        showLocation: extendedProfile.showLocation,
        showWebsite: extendedProfile.showWebsite,


        //variable to monitor change
        linkedInChanged: false,
        twitterChanged: false,
        youtubeChanged: false,
        gitHubChanged: false,
        quoraChanged: false,
        spotifyChanged: false,
        mediumChanged: false,
        instagramChanged: false,
        snapchatChanged: false,
        discordChanged: false,
        twitchChanged: false,
        vimeoChanged: false,
        tinderChanged: false,
        facebookChanged: false,
        telegramChanged: false,
        
        locationChanged: false,
        websiteChanged: false,
        
        profileEmailChanged: false,
        whatsappCountryCodeChanged: false,
        whatsappChanged: false,
        contactNumberCountryCodeChanged: false,
        contactNumberChanged: false,
        isWhatsappAndContactNumberSameChanged: false,


        profileEmailError: false,
        contactNumberError: false,
        whatsappError: false,
        serverError: false,
        serverRequestSent: false,

    })


    // console.log(values);
    useEffect(()=>{
        getExtendedProfileList()
            .then(data => {
                setTimeout(()=>{
                    setList({  defaultLoading: false, mobileNumberCountryCodes: data.mobileNumberCountryCodes});
                },1000)
            })
    },[])

    const handleChange = (name) => (event) => {
        // console.log(name)
        // console.log(event.target.checked)
        setValues({ ...values, [name]: event.target.value, [`${name}Changed`]: true, [`${name}Error`]: false});
      };
    
    const handleCheckboxChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.checked, [`${name}Changed`]: true});
    } 

    const onSubmit = (event) => {
        event.preventDefault();

        let errorObject = {};
        let isErrorFound = false

        if(!isValidExternalEmail(values.profileEmail)){
            isErrorFound = true;
            errorObject = {...errorObject, profileEmailError: 'Invalid email'}
        }
        if(!isValidWhatsappOrContact(values.contactNumber)){
            isErrorFound = true;
            errorObject = {...errorObject, contactNumberError: 'Invalid contact number'}
        }
        if(!isValidWhatsappOrContact(values.whatsapp)){
            isErrorFound = true;
            errorObject = {...errorObject, whatsappError: 'Invalid whatsapp number'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }
        


        let changedData = {};
        
        if(values.linkedInChanged) changedData = {...changedData, linkedIn: values.linkedIn}
        if(values.twitterChanged) changedData = {...changedData, twitter: values.twitter}
        if(values.youtubeChanged) changedData = {...changedData, youtube: values.youtube}
        if(values.gitHubChanged) changedData = {...changedData, gitHub: values.gitHub}
        if(values.quoraChanged) changedData = {...changedData, quora: values.quora}
        if(values.spotifyChanged) changedData = {...changedData, spotify: values.spotify}
        if(values.mediumChanged) changedData = {...changedData, medium: values.medium}
        if(values.instagramChanged) changedData = {...changedData, instagram: values.instagram}
        if(values.snapchatChanged) changedData = {...changedData, snapchat: values.snapchat}
        if(values.discordChanged) changedData = {...changedData, discord: values.discord}
        if(values.twitchChanged) changedData = {...changedData, twitch: values.twitch}
        if(values.vimeoChanged) changedData = {...changedData, vimeo: values.vimeo}
        if(values.tinderChanged) changedData = {...changedData, tinder: values.tinder}
        if(values.facebookChanged) changedData = {...changedData, facebook: values.facebook}
        if(values.telegramChanged) changedData = {...changedData, telegram: values.telegram}
        if(values.profileEmailChanged) changedData = {...changedData, profileEmail: values.profileEmail}
        // if(values.whatsappCountryCodeChanged) changedData = {...changedData, whatsappCountryCode: values.whatsappCountryCode}
        if(values.whatsappChanged) changedData = {...changedData, whatsapp: values.whatsapp, whatsappCountryCode: values.whatsappCountryCode}
        // if(values.contactNumberCountryCodeChanged) changedData = {...changedData, contactNumberCountryCode: values.contactNumberCountryCode}
        if(values.contactNumberChanged) changedData = {...changedData, contactNumber: values.contactNumber, contactNumberCountryCode: values.contactNumberCountryCode}
        // if(values.isWhatsappAndContactNumberSameChanged) 
        // changedData = {...changedData, isWhatsappAndContactNumberSame: values.isWhatsappAndContactNumberSame}
        
        if(values.locationChanged) changedData = {...changedData, location: values.location}
        if(values.websiteChanged) changedData = {...changedData, website: values.website}

        changedData = {...changedData, 
            showLinkedIn: values.showLinkedIn,
            showTwitter: values.showTwitter,
            showYoutube: values.showYoutube,
            showGitHub: values.showGitHub,
            showQuora: values.showQuora,
            showSpotify: values.showSpotify,
            showMedium: values.showMedium,
            showInstagram: values.showInstagram,
            showSnapchat: values.showSnapchat,
            showDiscord: values.showDiscord,
            showTwitch: values.showTwitch,
            showVimeo: values.showVimeo,
            showTinder: values.showTinder,
            showFacebook: values.showFacebook,
            showTelegram: values.showTelegram,
            showProfileEmail: values.showProfileEmail,
            showWhatsapp: values.showWhatsapp,
            showContactNumber: values.showContactNumber,
            showLocation: values.showLocation,
            showWebsite: values.showWebsite
        }

        setValues({...values, serverRequestSent: true})
        updateExtendedProfessionalProfile(token,sessionId,changedData)
            .then(response => {
                // console.log(response);
                if(response.success){
                    // console.log("DONE")
                    navigate("/user/profile/b/edit")
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverRequestSent: false, serverError: response.error})
                    console.log("Something went wrong")
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong'})
                console.log(err.message)
            })
        // console.log(changedData);
    }

    const iconWidth = "40px"
    const iconHeight = "40px"

    // const a = {facebook:'facebook2', twitter:'twitter2'};
    // for(let i in a){
    //     console.log(a[i])
    //     console.log(a[toString(a[i])]);
    // }
    // console.log(icons["linkedIn"])

    // const a = "facebook";
    // const b = `show${a.slice(0,1).toUpperCase() + a.slice(1)}`;
    // console.log(b);
    // const s = values[b];
    // console.log(s);

    const handleChange2 = (name, event) => {
        // console.log(name)
        // console.log(event.target.checked)
        setValues({ ...values, [name]: event.target.value, [`${name}Changed`]: true, [`${name}Error`]: false});
      };
    
    const handleCheckboxChange2 = (name, event) => {
        setValues({ ...values, [name]: event.target.checked, [`${name}Changed`]: true});
    } 

    return (
        <Base>
        {list.defaultLoading? <Loading/> : 
        <form>
            <div className="row">
                <div className="col-lg-6">
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.facebook}
                id = {'facebook'}
                name = {'facebook'}
                placeholder={'Your facebook profile'}
                checkboxMessage={'show facebook in your profile'}
                linkValue={values.facebook}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showFacebook}
            />
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.instagram}
                id = {'instagram'}
                name = {'instagram'}
                placeholder={'Your instagram profile'}
                checkboxMessage={'show instagram in your profile'}
                linkValue={values.instagram}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showInstagram}
            />
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.twitter}
                id = {'twitter'}
                name = {'twitter'}
                placeholder={'Your twitter profile'}
                checkboxMessage={'show twitter in your profile'}
                linkValue={values.twitter}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showTwitter}
            />
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.snapchat}
                id = {'snapchat'}
                name = {'snapchat'}
                placeholder={'Your snapchat profile'}
                checkboxMessage={'show snapchat in your profile'}
                linkValue={values.snapchat}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showSnapchat}
            />

            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.telegram}
                id = {'telegram'}
                name = {'telegram'}
                placeholder={'Your telegram profile'}
                checkboxMessage={'show telegram in your profile'}
                linkValue={values.telegram}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showTelegram}
            />

<ExtendedProfileItem
                iconSrc={icons.location}
                id = {'location'}
                name = {'location'}
                placeholder={'Your location/google map link'}
                checkboxMessage={'show location in your profile'}
                linkValue={values.location}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showLocation}
            />

<ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.website}
                id = {'website'}
                name = {'website'}
                placeholder={'Your website url'}
                checkboxMessage={'show your website in your profile'}
                linkValue={values.website}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showWebsite}
            />

            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.discord}
                id = {'discord'}
                name = {'discord'}
                placeholder={'Your discord profile'}
                checkboxMessage={'show discord in your profile'}
                linkValue={values.discord}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showDiscord}
            />
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.twitch}
                id = {'twitch'}
                name = {'twitch'}
                placeholder={'Your twitch profile'}
                checkboxMessage={'show twitch in your profile'}
                linkValue={values.twitch}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showTwitch}
            />
            <ExtendedProfileItem
                // headMessage={'Your whatsapp number'}
                iconSrc={icons.vimeo}
                id = {'vimeo'}
                name = {'vimeo'}
                placeholder={'Your vimeo profile'}
                checkboxMessage={'show vimeo in your profile'}
                linkValue={values.vimeo}
                handleChange = {handleChange2}
                handleCheckboxChange = {handleCheckboxChange2}
                isChecked = {values.showVimeo}
            />
                </div>
                <div className="col-lg-6">

                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.tinder}
                    id = {'tinder'}
                    name = {'tinder'}
                    placeholder={'Your tinder profile'}
                    checkboxMessage={'show tinder in your profile'}
                    linkValue={values.tinder}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showTinder}
                />
                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.linkedIn}
                    id = {'linkedIn'}
                    name = {'linkedIn'}
                    placeholder={'Your linkedIn profile'}
                    checkboxMessage={'show linkedIn in your profile'}
                    linkValue={values.linkedIn}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showLinkedIn}
                />
                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.gitHub}
                    id = {'gitHub'}
                    name = {'gitHub'}
                    placeholder={'Your gitHub profile'}
                    checkboxMessage={'show gitHub in your profile'}
                    linkValue={values.gitHub}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showGitHub}
                />

                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.quora}
                    id = {'quora'}
                    name = {'quora'}
                    placeholder={'Your quora profile'}
                    checkboxMessage={'show quora in your profile'}
                    linkValue={values.quora}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showQuora}
                />
                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.medium}
                    id = {'medium'}
                    name = {'medium'}
                    placeholder={'Your medium profile'}
                    checkboxMessage={'show medium in your profile'}
                    linkValue={values.medium}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showMedium}
                />
                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.youtube}
                    id = {'youtube'}
                    name = {'youtube'}
                    placeholder={'Your youtube profile'}
                    checkboxMessage={'show youtube in your profile'}
                    linkValue={values.youtube}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showYoutube}
                />
                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.spotify}
                    id = {'spotify'}
                    name = {'spotify'}
                    placeholder={'Your spotify profile'}
                    checkboxMessage={'show spotify in your profile'}
                    linkValue={values.spotify}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showSpotify}
                />

                <ExtendedProfileItem
                    // headMessage={'Your whatsapp number'}
                    iconSrc={icons.profileEmail}
                    id = {'profileEmail'}
                    name = {'email'}
                    placeholder={'your email id (address)'}
                    checkboxMessage={'show email in your profile'}
                    linkValue={values.profileEmail}
                    handleChange = {handleChange2}
                    handleCheckboxChange = {handleCheckboxChange2}
                    isChecked = {values.showProfileEmail}
                />
                { <div style={values.profileEmailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.profileEmailError}</div>}
                    

                </div>
            </div>

            {/* {list.extendedProfiles.map((item,index) => {
                    return (
                    <div key={index} className="form-group row mt-4">
                        <div className="col-auto">
                            <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons[item]} />
                        </div>
                        <div className="col-8">
                            <input onChange={handleChange(`${item}`)} value={values[item]} type="text" className="form-control" id={item} placeholder={`Paste your ${item} profile link here...`}/>
                        </div>
                        <div className="w-100"/>
                        <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
                            <input onChange={handleCheckboxChange(`show${item.slice(0,1).toUpperCase() + item.slice(1)}`)} checked={values[`show${item.slice(0,1).toUpperCase() + item.slice(1)}`]} className="form-check-input" type="checkbox" value="" id={`show${item}`}/>
                            <label className="form-check-label text-muted" htmlFor={`show${item}`}>
                                {`show ${item} in profile`}
                            </label>
                        </div>
                    </div>
                    )
                })}

                <div className="form-group row mt-4">
                    <div className="col-auto">
                            <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.profileEmail} />
                    </div>
                    <div className="col-8">
                        <input onChange={handleChange("profileEmail")} value={values.profileEmail} type="email" className="form-control" id="profileEmail" placeholder={`Please enter your email id`}/>
                    </div>
                    <div className="w-100"/>
                    <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
                        <input onChange={handleCheckboxChange('showProfileEmail')} checked={values.showProfileEmail} className="form-check-input" type="checkbox" value="" id={`showProfileEmail`}/>
                        <label className="form-check-label text-muted" htmlFor={`showProfileEmail`}>
                            {`show email in profile`}
                        </label>
                    </div>
                </div> */}

                {/* Mobile Number */}
                <div className="form-group d-flex mt-5">
                    <div className="">
                        <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.contactNumber} />
                        <div style={{fontSize:'0.8rem'}} className='mt-2'>mobile</div>
                    </div>
                    <div style={{marginLeft:'20px', width:'80%', maxWidth:'500px'}}>
                        <div className="row">
                            <div className="form-group col-4">
                                <select onChange={handleChange("contactNumberCountryCode")} value={values.contactNumberCountryCode} id="mobileNumberCountryCode" className="form-control">
                                    {list.mobileNumberCountryCodes.map((countryCode, index) => {
                                        return (
                                            <option key={index} value={index}>{countryCode}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-8">
                                <input onChange={handleChange("contactNumber")} value={values.contactNumber} type="number" className="form-control" id="contactNumber" aria-describedby="contactNumberHelp" placeholder="Your calling number"/>
                            </div>
                        </div>
                        <div className="form-check mt-2 float-right">
                            <input onChange={handleCheckboxChange('showContactNumber')} checked={values.showContactNumber} className="form-check-input" type="checkbox" value="" id={`showContactNumber`}/>
                            <label className="form-check-label text-muted" htmlFor={`showMobileNumber`}>
                                {`show calling number in profile`}
                            </label>
                        </div>
                    </div>
                    {/* <div className="w-100"/> */}
                </div>
                { <div style={values.contactNumberError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.contactNumberError}</div>}
                
                
                {/* Whatsapp */}
                <div className="form-group d-flex mt-5">
                    <div className="">
                        <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.whatsapp} />
                        <div style={{fontSize:'0.8rem'}} className='mt-2'>whatsapp</div>
                    </div>
                    <div style={{marginLeft:'20px', width:'80%', maxWidth:'500px'}}>
                        <div className="row">
                            <div className="form-group col-4">
                                <select onChange={handleChange("whatsappCountryCode")} value={values.whatsappCountryCode} id="whatsappCountryCode" className="form-control">
                                    {list.mobileNumberCountryCodes.map((countryCode, index) => {
                                        return (
                                            <option key={index} value={index}>{countryCode}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-8">
                                <input onChange={handleChange("whatsapp")} value={values.whatsapp} type="number" className="form-control" id="whatsapp" aria-describedby="contactNumberHelp" placeholder="Your whatsapp number"/>
                            </div>
                        </div>
                        <div className="form-check mt-2 float-right">
                            <input onChange={handleCheckboxChange('showWhatsapp')} checked={values.showWhatsapp} className="form-check-input" type="checkbox" value="" id={`showWhatsapp`}/>
                            <label className="form-check-label text-muted" htmlFor={`showMobileNumber`}>
                                {`show whatsapp in profile`}
                            </label>
                        </div>
                    </div>
                    {/* <div className="w-100"/> */}
                    
                </div>
                { <div style={values.whatsappError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.whatsappError}</div>}
                

                {/* isWhatsappAndContactNumberSame */}
                {/* <div className="form-check mt-5">
                    <input onChange={handleCheckboxChange("isWhatsappAndContactNumberSame")} checked={values.isWhatsappAndContactNumberSame} className="form-check-input" type="checkbox" id={`isWhatsappAndContactNumberSame`} />
                    <label className="form-check-label text-muted" htmlFor={`isWhatsappAndContactNumberSame`}>
                        {`is Whatsapp and contact number same ?`}
                    </label>
                </div> */}
                

                <div className="text-center mt-5">
                    { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
                    {values.serverRequestSent && <Loading/>}
                    <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className="myButton">Update Social Profile</button>
                </div>
        </form>
        }
        </Base>
    )

}

export default UpdateExtendedProfessionalProfile