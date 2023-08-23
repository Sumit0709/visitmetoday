import React, { Fragment, useState ,useEffect } from "react";
import Base from "../core/Base";

import UpdateExtendedProfile from "./extendedProfile/UpdateExtendedProfile";
import UpdateBasicProfile from "./basicProfile/UpdateBasicProfile";
import UpdateProfilePhoto from "./profilePhoto/UpdateProfilePhoto";
import { isAuthenticated } from "../apiCalls/authUser";
import { getProfile, getProfileUrl } from "../apiCalls/profile";
import BasicProfilePreview from "./basicProfile/BasicProfilePreview";
import ProfilePhotoPreview from "./profilePhoto/ProfilePhotoPreview";
import ExtendedProfilePreview from "./extendedProfile/ExtendedProfilePreview";
import Loading from "../core/Loading";
import CustomUrl from "./customUrl/CustomUrl";

import copyIcon from '../media/copy.svg'
import './UserHome.css';
import { useNavigate } from "react-router-dom";
import CardSection from "../core/CardSection";

import edit_profile from '../media/edit_profile.svg'
import edit_social from '../media/edit_social.svg'
import edit_photo from '../media/edit_photo.svg'
import edit_link from '../media/edit_link.svg'
import professional_profile from '../media/professional_profile.svg'
import visiting_page from '../media/visiting_page.svg'
import view_analysis from '../media/view_analysis.svg'
import download_file from '../media/download_file.svg'

const UserHome = () => {
    // console.log("Edit Profile")
    // console.log(profile);

    const navigate = useNavigate();

    const {sessionId} = isAuthenticated();

    const [profile, setProfile] = useState(null)
    const [values, setValues] = useState({
        serverError: false,
        serverRequestSent: false,

        publicProfileRequestSent: false,
        publicProfileError: false,

    });
    const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

    useEffect(() => {
        const {token, sessionId, role, isProfile} = isAuthenticated();
        preLoadProfile(token, sessionId);
    },[])

    const preLoadProfile = async (token,sessionId) => {
        getProfile(token, sessionId)
            .then(response => {
                // console.log(response);
                if(response.success){
                    // console.log(response.profile)
                    setProfile(response.profile);
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverError: 'something went wrong!'})
                    // console.log(response)
                }
            })
            .catch(err => {
                setValues({...values, serverError: 'something went wrong!'})
                // console.log(err)
            })
        }
    // console.log(profile);


    const basicProfile = profile == null ? {} : {
        firstName: profile.firstName,
        middleName: profile.middleName? profile.middleName: "",
        lastName: profile.lastName? profile.lastName: "",
        gender: profile.gender,
        age: profile.age,
        country: profile.country,
        motto: profile.motto? profile.motto: "",
        personality: profile.personality? profile.personality: "",
    }

    const extendedProfile = profile == null? {}: {
        linkedIn: profile.linkedIn? profile.linkedIn: "",
        twitter: profile.twitter? profile.twitter: "",
        youtube: profile.youtube? profile.youtube: "",
        gitHub: profile.gitHub? profile.gitHub: "",
        quora: profile.quora? profile.quora: "",
        spotify: profile.spotify? profile.spotify: "",
        medium: profile.medium? profile.medium: "",
        instagram: profile.instagram? profile.instagram: "",
        snapchat: profile.snapchat? profile.snapchat: "",
        discord: profile.discord? profile.discord: "",
        twitch: profile.twitch? profile.twitch: "",
        vimeo: profile.vimeo? profile.vimeo: "",
        tinder: profile.tinder? profile.tinder: "",
        facebook: profile.facebook? profile.facebook: "",
        telegram: profile.telegram? profile.telegram: "",
        
        location: profile.location? profile.location: "",
        website: profile.website? profile.website: "",
        
        profileEmail: profile.profileEmail? profile.profileEmail: "",
        whatsappCountryCode: profile.whatsappCountryCode? profile.whatsappCountryCode: 0,
        whatsapp: profile.whatsapp? profile.whatsapp: "",
        contactNumberCountryCode: profile.contactNumberCountryCode? profile.contactNumberCountryCode: 0,
        contactNumber: profile.contactNumber? profile.contactNumber: "",
        isWhatsappAndContactNumberSame: profile.isWhatsappAndContactNumberSame? profile.isWhatsappAndContactNumberSame: false,
        
        showLinkedIn: profile.showLinkedIn? profile.showLinkedIn: false,
        showTwitter: profile.showTwitter? profile.showTwitter: false,
        showYoutube: profile.showYoutube? profile.showYoutube: false,
        showGitHub: profile.showGitHub? profile.showGitHub: false,
        showQuora: profile.showQuora? profile.showQuora: false,
        showSpotify: profile.showSpotify? profile.showSpotify: false,
        showMedium: profile.showMedium? profile.showMedium: false,
        showInstagram: profile.showInstagram? profile.showInstagram: false,
        showSnapchat: profile.showSnapchat? profile.showSnapchat: false,
        showDiscord: profile.showDiscord? profile.showDiscord: false,
        showTwitch: profile.showTwitch? profile.showTwitch: false,
        showVimeo: profile.showVimeo? profile.showVimeo: false,
        showTinder: profile.showTinder? profile.showTinder: false,
        showFacebook: profile.showFacebook? profile.showFacebook: false,
        showTelegram: profile.showTelegram? profile.showTelegram: false,
        
        showLocation: profile.showLocation? profile.showLocation: false,
        showWebsite: profile.showWebsite? profile.showWebsite: false,
        
        showProfileEmail: profile.showProfileEmail? profile.showProfileEmail: false,
        showWhatsapp: profile.showWhatsapp? profile.showWhatsapp: false,
        showContactNumber: profile.showContactNumber? profile.showContactNumber: false,
    }


    const onReferalCopy = async () => {
        try {
            await navigator.clipboard.writeText(profile.referalCode);

            setIsCopiedToClipboard(true);
            setTimeout(() => {
                setIsCopiedToClipboard(false);
            }, 2000);
            
        } catch (err) {
            console.log(err.message)
        }
    }

    const onPreviewProfile = () => {
        setValues({...values, publicProfileRequestSent: true, publicProfileError: false});

        getProfileUrl(sessionId)
            .then(response=> {
                if(response.success){
                    // setShowNavigating(true);
                    // setTimeout(() => {
                        // console.log("DONE")
                        // setValues({...values, profilePreviewStarted: false})
                        navigate(`/${response.url}`);
                    // }, 1000);
                }
                else{
                    setValues({...values, publicProfileRequestSent: false, publicProfileError: response.error})
                    // console.log("URLnot found")
                    // console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, publicProfileRequestSent: false, publicProfileError: 'something wnet wrong!'})
                // console.loog(err.message)
            })
    }

    const onCard = () => {
        navigate('/user/card')
    }

    const onEditProfile = () => {
        navigate('/user/profile/edit')
    }

    const onProfessionalProfilePreview = () => {
        // console.log("professional profile")
        navigate("/user/profile/b");
    }

    const onViewAnalysis = () => {
        navigate('/user/analysis')
    }


    return (
        <Base>
            {
                profile == null ? <Loading/> : 
                <div>
                    {
                        values.serverError? 
                        <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div> :

                        <div>
                            <div className="text-center mt-5" style={{fontWeight:'500'}}>Your Invite Code: <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500"}}>{profile.referalCode}</span> <img onClick={onReferalCopy} className="edit_profile_referal_copy" style={{width:"25px", height:"25px", alignItems:'baseline'}} src={copyIcon}/></div>     
                            {<div className="text-center" style={isCopiedToClipboard? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{'successfully copied to clipboard'}</div>}           
                            <hr/>
                            {/* <div className="text-center mt-3" style={{fontWeight:'500'}}>Your Profile has <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500", fontSize:'1.5rem'}}>{profile.visitCounter}</span> Visitor.</div>              
                            <hr/> */}

                            <div className="text-center">
                                {values.publicProfileRequestSent? <Loading/>: <></>}
                            </div>

                            <div style={{margin:'auto'}}>
                                { <div style={values.publicProfileError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.publicProfileError}</div>}
                                {/* <button onClick={onPreviewProfile} style={{width:'80%', maxWidth:'500px'}} className="myButton">My Visiting Page</button> */}
                                <CardSection goTo={onPreviewProfile} src={visiting_page} heading='Your Visiting Page' description={"Shows the prieview of your visiting page"}/>
                            </div>

                            {/* <div className="edit_profile_2d">
                                

                                {<CardSection goTo={onCard} src={edit_profile} />}
                                <div className="text-center mt-4">
                                    <button onClick={onCard} style={{width:'80%', maxWidth:'500px'}} className="myButton">My E-Visiting Card</button>
                                </div>
                            </div> */}


                            {/* <div className="edit_profile_2d">
                                <ProfilePhotoPreview/>
                                <BasicProfilePreview basicProfile = {basicProfile}/>
                            </div> */}

                            <div style={{margin:'auto'}}>
                                <CardSection goTo={onProfessionalProfilePreview} src={professional_profile} heading='Business Profile' description={"Business Profile Section"}/>
                                
                                {/* <button onClick={onProfessionalProfilePreview} style={{width:'100%'}} className="myButton">My Business Profile</button> */}
                            </div>
                            
                            <div style={{margin:'auto'}}>
                                <CardSection goTo={onViewAnalysis} src={view_analysis} heading='Views Analysis' description={"Get Detailed analysis of your profile."}/>
                                
                                {/* <button onClick={onProfessionalProfilePreview} style={{width:'100%'}} className="myButton">My Business Profile</button> */}
                            </div>

                            <div style={{margin:'auto'}}>
                                <CardSection goTo={onEditProfile} src={edit_profile} heading='Edit Your Profile' description={"Edit Your profile pic, personal and social informations"}/>
                                {/* <button onClick={onProfessionalProfilePreview} style={{width:'100%'}} className="myButton">My Business Profile</button> */}
                            </div>
                            
                            <div className="edit_profile_2d">
                                {/* <ExtendedProfilePreview extendedProfile = {extendedProfile}/> */}
                                {/* <CustomUrl/> */}
                            </div>
                            {/* <div style={{width:'80%', maxWidth:'500px', margin:'auto'}}>
                                <button onClick={onProfessionalProfilePreview} style={{width:'100%'}} className="myButton">My Business Profile</button>
                            </div> */}
                            
                        </div>
                    }
                </div>
            }
        </Base>
    )

}
{/* <div style={{width: "100%", height: "90vh", display:"flex", justifyContent:"center", alignItems: "center" }}>LOADING...</div> */}
export default UserHome;