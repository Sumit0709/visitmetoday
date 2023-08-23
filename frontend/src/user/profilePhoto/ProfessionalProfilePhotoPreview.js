import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/authUser";
import { updateProfilePhoto } from "../../apiCalls/profile";
import ProfilePhoto from "./ProfilePhoto";

import CommonCss from '../../core/CommonCss.css'
import ProfessionalProfilePhoto from "./ProfessionalProfilePhoto";

const ProfessionalProfilePhotoPreview = () => {
    const navigate = useNavigate();

    const {role, sessionId, token} = isAuthenticated();
    

    const formData = new FormData();

    const handleChange = (name)=> (event) => {
        const value = event.target.files[0];
        formData.set("photo",value);
        console.log(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        navigate("profilePhoto", {replace: false})
        
        // updateProfilePhoto(token, sessionId, formData)
        //     .then(response => {
        //         if(response.success){
        //             console.log(response)
        //             console.log("Reload to see change");
        //         }
        //         else{
        //             console.log(response)
        //             console.log("Something went wrong")
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     })
    }


    return (
        <div>
            <ProfessionalProfilePhoto sessionId={sessionId}/>
            {/* <form> */}
                <div className="text-center mt-4">
                    <button onClick={onSubmit} style={{width:'80%', maxWidth:'500px'}} className="myButton">Click to update your Profile Pic</button>
                </div>
            {/* </form> */}
            <hr className="mt-4"/>
        </div>
    )
}

export default ProfessionalProfilePhotoPreview;