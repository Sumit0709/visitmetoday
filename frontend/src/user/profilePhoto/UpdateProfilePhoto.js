import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/authUser";
import { updateProfilePhoto } from "../../apiCalls/profile";
import Base from "../../core/Base";
import { isValidPhoto } from "../../validationCheck/validate";
import ProfilePhoto from "./ProfilePhoto";

import CommonCss from '../../core/CommonCss.css'
import upload from '../../media/upload.png'
import Loading from "../../core/Loading";
import CardSectionHeading from "../../core/CardSectionHeading";
import edit_photo from '../../media/edit_photo.svg'

const UpdateProfilePhoto = () => {
    
    const navigate = useNavigate();
    
    const {role, sessionId, token} = isAuthenticated();

    const [imageDataURL, setImageDataURL] = useState(null);

    const [values, setValues] = useState({
        validPhoto: false,
        validationError: "Select an image file.",
        showError: false,
        formData: new FormData(),
        photo: null,

        serverRequestSent: false,
        serverError: false,
    });

    // const formData = new FormData();

    const handleChange = (name)=> (event) => {
        const value = event.target.files[0];
        const validationResult = isValidPhoto(value);

        if(!validationResult.success){
            setValues({validPhoto: false, validationError: validationResult.error, showError: true, photo: value})
        }
        else{

            const reader = new FileReader();

            reader.onload = (e) => {
                // Set the preview image source to the data URL.
                // console.log(e.target.result)
                setImageDataURL(e.target.result);
            };

            // Read the image file as a data URL.
            reader.readAsDataURL(value);

            const newForm = new FormData();
            newForm.set("photo",value);
            setValues({validPhoto: true, validationError: "", showError: false, formData: newForm, photo: value})
        }

        
        // console.log(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        if(!values.validPhoto){
            setValues({validPhoto: false, validationError: 'please select a photo!', showError: true})
            return;
        }

        setValues({...values, serverRequestSent: true})

        updateProfilePhoto(token, sessionId, values.formData)
            .then(response => {
                if(response.success){
                    // console.log(response)
                    navigate('/user/profile')
                    // window.location.reload(true) // false to make reload from cached version of the page, true to do complete page refresh from server 
                    // console.log("Reload to see change");
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverRequestSent: false, serverError: response.error})
                    // console.log(response)
                    console.log("Something went wrong")
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong!'})
                console.log(err.message);
            })
    }


    return (
        <Base>
            <CardSectionHeading src={edit_photo} heading={'Update Profile Photo'}/>
            <ProfilePhoto sessionId={sessionId} imageDataURL={imageDataURL}/>
            <form>
                <div className="mt-4">
                    <div className="">

                        <div className='mb-1'>Upload profile Photo<span style={{color: 'red', fontWeight: '800'}}>*</span></div>
                        <input onChange={handleChange("photo")} type="file" id="photo" />
                        <label htmlFor="photo" className="photo"><img style={{width:'35px', height:'35px'}} src={upload}/></label>
                        <span style={values.photo? {color: 'green', marginLeft: '10px', fontWeight:500}: {color:'red', marginLeft: '10px', fontWeight:500}}>
                            {values.photo? values.photo.name: "Choose an image..."}
                        </span>
                        { <div style={values.showError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.validationError}</div>}
                        { <div style={!values.showError && values.photo ? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{`Image selected.`}</div>}

                        <div className="mt-1"><small>Please Select a file from your device to set as your new Profile Photo</small></div>
                        <div><span style={{fontWeight: '500'}}>Note: </span>{`Maximum allowed File size is 8MB`}</div>
                        <div><span style={{fontWeight: '500'}}>Note: </span>{`Only .png/.jpg/.jpeg files are allowed`}</div>
                    </div>
                    <div className="text-center">
                        {<div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
                        {values.serverRequestSent && <Loading/>}
                        <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className="myButton mt-4">Update Profile Pic</button>
                    </div>
                </div>
            </form>
            <hr className="mt-4 mb-5"/>
        </Base>
    )
}

export default UpdateProfilePhoto;