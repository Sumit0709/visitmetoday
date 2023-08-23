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
import { useNavigate } from "react-router-dom"

import ProfilePreview from "../ProfilePreview.css"

import CommonCss from '../../core/CommonCss.css'

const ExtendedProfilePreview = ({extendedProfile}) => {
    
    const navigate = useNavigate();

    // const icons = {
    //     linkedIn: linkedInIcon,
    //     twitter: twitterIcon,
    //     youtube: youtubeIcon,
    //     gitHub: gitHubIcon,
    //     quora: quoraIcon,
    //     spotify: spotifyIcon,
    //     medium: mediumIcon,
    //     facebook: facebookIcon,
    //     instagram: instagramIcon,
    //     snapchat: snapchatIcon,
    //     discord: discordIcon,
    //     twitch: twitchIcon,
    //     vimeo: vimeoIcon,
    //     tinder: tinderIcon,
    //     profileEmail: profileEmailIcon,
    //     whatsapp: whatsappIcon,
    //     contactNumber: contactNumberIcon,
    //     telegram: telegramIcon
    // }

    const [list, setList] = useState({extendedProfiles: ["Loading..."], mobileNumberCountryCodes: ["Loading..."]})

    // const [values, setValues] = useState({
    //     linkedIn: extendedProfile.linkedIn,
    //     twitter: extendedProfile.twitter,
    //     youtube: extendedProfile.youtube,
    //     gitHub: extendedProfile.gitHub,
    //     quora: extendedProfile.quora,
    //     spotify: extendedProfile.spotify,
    //     medium: extendedProfile.medium,
    //     instagram: extendedProfile.instagram,
    //     snapchat: extendedProfile.snapchat,
    //     discord: extendedProfile.discord,
    //     twitch: extendedProfile.twitch,
    //     vimeo: extendedProfile.vimeo,
    //     tinder: extendedProfile.tinder,
    //     facebook: extendedProfile.facebook,
    //     telegram: extendedProfile.telegram,
    //     profileEmail: extendedProfile.profileEmail,
    //     whatsappCountryCode: extendedProfile.whatsappCountryCode,
    //     whatsapp: extendedProfile.whatsapp,
    //     contactNumberCountryCode: extendedProfile.contactNumberCountryCode,
    //     contactNumber: extendedProfile.contactNumber,
    //     isWhatsappAndContactNumberSame: extendedProfile.isWhatsappAndContactNumberSame,
        
    //     showLinkedIn: extendedProfile.showLinkedIn,
    //     showTwitter: extendedProfile.showTwitter,
    //     showYoutube: extendedProfile.showYoutube,
    //     showGitHub: extendedProfile.showGitHub,
    //     showQuora: extendedProfile.showQuora,
    //     showSpotify: extendedProfile.showSpotify,
    //     showMedium: extendedProfile.showMedium,
    //     showInstagram: extendedProfile.showInstagram,
    //     showSnapchat: extendedProfile.showSnapchat,
    //     showDiscord: extendedProfile.showDiscord,
    //     showTwitch: extendedProfile.showTwitch,
    //     showVimeo: extendedProfile.showVimeo,
    //     showTinder: extendedProfile.showTinder,
    //     showFacebook: extendedProfile.showFacebook,
    //     showTelegram: extendedProfile.showTelegram,
    //     showProfileEmail: extendedProfile.showProfileEmail,
    //     showWhatsapp: extendedProfile.showWhatsapp,
    //     showContactNumber: extendedProfile.showContactNumber,




    //     //variable to monitor change
    //     // linkedInChanged: false,
    //     // twitterChanged: false,
    //     // youtubeChanged: false,
    //     // gitHubChanged: false,
    //     // quoraChanged: false,
    //     // spotifyChanged: false,
    //     // mediumChanged: false,
    //     // instagramChanged: false,
    //     // snapchatChanged: false,
    //     // discordChanged: false,
    //     // twitchChanged: false,
    //     // vimeoChanged: false,
    //     // tinderChanged: false,
    //     // facebookChanged: false,
    //     // telegramChanged: false,
    //     // profileEmailChanged: false,
    //     // whatsappCountryCodeChanged: false,
    //     // whatsappChanged: false,
    //     // contactNumberCountryCodeChanged: false,
    //     // contactNumberChanged: false,
    //     // isWhatsappAndContactNumberSameChanged: false,
        
    //     // showLinkedInChanged: false,
    //     // showTwitterChanged: false,
    //     // showYoutubeChanged: false,
    //     // showGitHubChanged: false,
    //     // showQuoraChanged: false,
    //     // showSpotifyChanged: false,
    //     // showMediumChanged: false,
    //     // showInstagramChanged: false,
    //     // showSnapchatChanged: false,
    //     // showDiscordChanged: false,
    //     // showTwitchChanged: false,
    //     // showVimeoChanged: false,
    //     // showTinderChanged: false,
    //     // showFacebookChanged: false,
    //     // showTelegramChanged: false,
    //     // showProfileEmailChanged: false,
    //     // showWhatsappChanged: false,
    //     // showContactNumberChanged: false,

    // })

    useEffect(()=>{
        getExtendedProfileList()
            .then(data => {
                setList({extendedProfiles:data.extendedProfiles, mobileNumberCountryCodes: data.mobileNumberCountryCodes});
            })
    },[])

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log("Redirect to Update extended profile")
        navigate("extendedProfile",{state:extendedProfile})
    }

    const iconWidth = "35px"
    const iconHeight = "35px"

    return (
        <form>
                <div className="text-center" style={{color: "#875"}}>Add/ Update/ Remove/ Show/ Hide Social profile Links</div>

                {/* <div style={{width:'80%', maxWidth:'500px', margin:'auto', marginTop:'20px'}}>
                <div style={{display:'grid', justifyContent:'space-between', gridTemplateColumns: 'auto auto auto'}} className='preview_extended_value'>
                {values.showFacebook? <a href={values.facebook} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.facebook} /></a>: <></>}
                {values.showInstagram? <a href={values.instagram} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.instagram} /></a>: <></>}
                {values.showLinkedIn? <a href={values.linkedIn} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.linkedIn} /></a>: <></>}
                {values.showTwitter? <a href={values.twitter} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.twitter} /></a>: <></>}
                {values.showYoutube? <a href={values.youtube} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.youtube} /></a>: <></>}
                {values.showGitHub? <a href={values.gitHub} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.gitHub} /></a>: <></>}
                {values.showQuora? <a href={values.quora} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.quora} /></a>: <></>}
                {values.showSpotify? <a href={values.spotify} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.spotify} /></a>: <></>}
                {values.showMedium? <a href={values.medium} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.medium} /></a>: <></>}
                {values.showSnapchat? <a href={values.snapchat} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.snapchat} /></a>: <></>}
                {values.showDiscord? <a href={values.discord} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.discord} /></a>: <></>}
                {values.showTwitch? <a href={values.twitch} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.twitch} /></a>: <></>}
                {values.showVimeo? <a href={values.vimeo} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.vimeo} /></a>: <></>}
                {values.showTinder? <a href={values.tinder} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.tinder} /></a>: <></>}
                {values.showTelegram? <a href={values.telegram} target="_blank"><img className='preview_extended_value_icons' style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.telegram} /></a>: <></>}
                
                {values.showProfileEmail? <a href={values.profileEmail} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.profileEmail} /></a>: <></>}
                {values.showWhatsapp? <a href={`https://api.whatsapp.com/send?phone=${values.whatsapp}`} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.whatsapp} /></a>: <></>}
                {values.showContactNumber? <a href={values.contactNumber} target="_blank"><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.contactNumber} /></a>: <></>}

                </div>
                </div> */}

                <div className="text-center mt-4">
                    <button onClick={onSubmit} className="myButton">Click to update your social Profile</button>
                </div>
                <hr className="mt-4"/>
        </form>
    )

}

export default ExtendedProfilePreview


// {list.extendedProfiles.map((item,index) => {
//     return (
//     <div key={index} className="form-group row mt-4">
//         <div className="col-auto">
//             <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons[item]} />
//         </div>
//         <div className="col-8">
//             <input value={values[item]} disabled type="text" className="form-control text-muted" id={item} />
//         </div>
//         <div className="w-100"/>
//         <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
//             <input disabled checked={values[`show${item.slice(0,1).toUpperCase() + item.slice(1)}`]} className="form-check-input" type="checkbox" value="" id={`show${item}`}/>
//             <label className="form-check-label text-muted" htmlFor={`show${item}`}>
//                 {`show ${item} in profile`}
//             </label>
//         </div>
//     </div>
//     )
// })}

// <div className="form-group row mt-4">
//     <div className="col-auto">
//             <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.profileEmail} />
//     </div>
//     <div className="col-8">
//         <input value={values.profileEmail} disabled type="email" className="form-control text-muted" id="profileEmail" placeholder={`Please enter your email id`}/>
//     </div>
//     <div className="w-100"/>
//     <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
//         <input checked={values.showProfileEmail} disabled className="form-check-input" type="checkbox" value="" id={`showProfileEmail`}/>
//         <label className="form-check-label text-muted" htmlFor={`showProfileEmail`}>
//             {`show email in profile`}
//         </label>
//     </div>
// </div>


// <div className="row pt-4">
//     <div className="col-auto">
//         <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.contactNumber} />
//     </div>
//     <div className="form-group col-3">
//         <select value={values.contactNumberCountryCode} disabled id="mobileNumberCountryCode" className="form-control text-muted">
//             {list.mobileNumberCountryCodes.map((countryCode, index) => {
//                 return (
//                     <option key={index} value={index}>{countryCode}</option>
//                 )
//             })}
//         </select>
//     </div>
//     <div className="form-group col-5">
//         <input value={values.contactNumber} disabled type="number" className="form-control text-muted" id="contactNumber" aria-describedby="mobileNumberHelp"/>
//     </div>
//     <div className="w-100"/>
//     <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
//         <input checked={values.showContactNumber} disabled className="form-check-input" type="checkbox" value="" id={`showContactNumber`}/>
//         <label className="form-check-label text-muted" htmlFor={`showContactNumber`}>
//             {`show contact number in profile`}
//         </label>
//     </div>
// </div>


// <hr className=""/>
// <div className="form-check">
//     <input checked={values.isWhatsappAndContactNumberSame} disabled className="form-check-input" type="checkbox" id={`isWhatsappAndContactNumberSame`} />
//     <label className="form-check-label text-muted" htmlFor={`isWhatsappAndContactNumberSame`}>
//         {`is Whatsapp and contact number same ?`}
//     </label>
// </div>
// <hr/>


// <div className="row pt-4">
//     <div className="col-auto">
//         <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={icons.whatsapp} />
//     </div>
//     <div className="form-group col-3">
//         <select value={values.whatsappCountryCode} disabled id="whatsappCountryCode" className="form-control text-muted">
//             {list.mobileNumberCountryCodes.map((countryCode, index) => {
//                 return (
//                     <option key={index} value={index}>{countryCode}</option>
//                 )
//             })}
//         </select>
//     </div>
//     <div className="form-group col-5">
//         <input value={values.whatsapp} disabled type="number" className="form-control text-muted" id="whatsapp" aria-describedby="mobileNumberHelp"/>
//     </div>
//     <div className="w-100"/>
//     <div className="form-check mt-2 float-right" style={{marginLeft: "15px"}}>
//         <input checked={values.showWhatsapp} disabled className="form-check-input" type="checkbox" value="" id={`showWhatsapp`}/>
//         <label className="form-check-label text-muted" htmlFor={`showWhatsapp`}>
//             {`show whatsapp in profile`}
//         </label>
//     </div>
// </div>