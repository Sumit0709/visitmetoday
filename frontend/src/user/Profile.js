import React, { Fragment, useEffect, useState } from "react";
import Base from "../core/Base";

import ExtendedProfile from "./extendedProfile/UpdateExtendedProfile";
import BasicProfile from "./basicProfile/UpdateBasicProfile";
import CreateProfile from "./CreateProfile";
import ProfilePhoto from "./profilePhoto/UpdateProfilePhoto";
import { isAuthenticated } from "../apiCalls/authUser";
import { getProfile } from "../apiCalls/profile";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const [isProfile, setIsProfile] = useState(false);

    useEffect(() => {
        // console.log("USE EFFECT");
        const authResult = isAuthenticated()
        
        if(authResult == false){
            navigate("/auth/signin",{replace: true})
        }
        else if(authResult.isProfile == true){
            setIsProfile(true);
        }
    },[]);

    return (
        <Base>
            {isProfile? 
                <EditProfile/>  
                :
                <CreateProfile/>
            }
        </Base>
    )

}

export default Profile;