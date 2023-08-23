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

const ExtendedProfessionalProfilePreview = ({extendedProfile}) => {
    
    const navigate = useNavigate();

    const [list, setList] = useState({extendedProfiles: ["Loading..."], mobileNumberCountryCodes: ["Loading..."]})

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

export default ExtendedProfessionalProfilePreview
