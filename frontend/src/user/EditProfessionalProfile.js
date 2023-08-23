import React, { Fragment, useState ,useEffect } from "react";
import Base from "../core/Base";

import UpdateExtendedProfile from "./extendedProfile/UpdateExtendedProfile";
import UpdateBasicProfile from "./basicProfile/UpdateBasicProfile";
import UpdateProfilePhoto from "./profilePhoto/UpdateProfilePhoto";
import { isAuthenticated } from "../apiCalls/authUser";
import { getProfessionalProfile, getProfessionalProfileUrl, getProfile, getProfileUrl } from "../apiCalls/profile";
import BasicProfilePreview from "./basicProfile/BasicProfilePreview";
import ProfilePhotoPreview from "./profilePhoto/ProfilePhotoPreview";
import ExtendedProfilePreview from "./extendedProfile/ExtendedProfilePreview";
import Loading from "../core/Loading";
import CustomUrl from "./customUrl/CustomUrl";

import copyIcon from '../media/copy.svg'
import editProfile from './EditProfile.css';
import { useNavigate } from "react-router-dom";
import BasicProfessionalProfilePreview from "./basicProfile/BasicProfessionalProfilePreview";
import ExtendedProfessionalProfilePreview from "./extendedProfile/ExtededProfessionalProfilePreview";
import CustomProfessionalUrl from "./customUrl/CustomProfessionalUrl";
import ProfessionalProfilePhotoPreview from "./profilePhoto/ProfessionalProfilePhotoPreview";

const EditProfessionalProfile = () => {
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
        getProfessionalProfile(token, sessionId)
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
        companyFirstName: profile.companyFirstName,
        companyMiddleName: profile.companyMiddleName? profile.companyMiddleName: "",
        companyLastName: profile.companyLastName? profile.companyLastName: "",
        sellOnline: profile.sellOnline,
        since: profile.since,
        country: profile.country,
        dealsIn: profile.dealsIn? profile.dealsIn: "",
        servesInArea: profile.servesInArea? profile.servesInArea: "",
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

        getProfessionalProfileUrl(sessionId)
            .then(response=> {
                console.log(response);
                if(response.success){
                    // setShowNavigating(true);
                    // setTimeout(() => {
                        // console.log("DONE")
                        // setValues({...values, profilePreviewStarted: false})
                        navigate(`/b/${response.url}`);
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
        navigate('/user/b/card')
    }

    const onProfessionalProfilePreview = () => {
        // console.log("professional profile")
        navigate("/user/profile/business");
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
                            <div className="text-center mt-3" style={{fontWeight:'500'}}>Your Profile has <span style={{textDecoration: "none", color: "#1D88FA", fontWeight: "500", fontSize:'1.5rem'}}>{profile.visitCounter}</span> Visitor.</div>              
                            <hr/>

                            <div className="text-center">
                                {values.publicProfileRequestSent? <Loading/>: <></>}
                            </div>

                            <div className="edit_profile_2d">
                                <div className="text-center mt-3">
                                    { <div style={values.publicProfileError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.publicProfileError}</div>}
                                    <button onClick={onPreviewProfile} style={{width:'80%', maxWidth:'500px'}} className="myButton">My Visiting Page</button>
                                </div>

                                <div className="text-center mt-4">
                                    <button onClick={onCard} style={{width:'80%', maxWidth:'500px'}} className="myButton">My E-Visiting Card</button>
                                </div>
                            </div>


                            <div className="edit_profile_2d">
                                <ProfessionalProfilePhotoPreview/>
                                <BasicProfessionalProfilePreview basicProfile = {basicProfile}/>
                            </div>
                            
                            <div className="edit_profile_2d">
                                <ExtendedProfessionalProfilePreview extendedProfile = {extendedProfile}/>
                                <CustomProfessionalUrl/>
                            </div>
                        </div>
                    }
                </div>
            }
        </Base>
    )

}
{/* <div style={{width: "100%", height: "90vh", display:"flex", justifyContent:"center", alignItems: "center" }}>LOADING...</div> */}
export default EditProfessionalProfile;