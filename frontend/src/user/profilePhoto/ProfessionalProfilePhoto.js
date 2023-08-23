import React, {useState} from 'react'
import Loading from '../../core/Loading';

const ProfessionalProfilePhoto = ({sessionId, imageDataURL}) => {

    const [values, setValues] = useState({
        isImageLoaded: false
    });

    const {isImageLoaded} = values;
    
    const url = imageDataURL? imageDataURL: `${process.env.REACT_APP_SERVER_API}/getProfilePhoto/b/${sessionId}`

  return (
    <div className="mt-3" style={{height:"150px", width:"150px", margin:"auto", borderRadius:"50% 50%"}}>
        {
            isImageLoaded? null: <Loading/>
        }
        <img style={isImageLoaded? {height:"150px", width:"150px", objectFit:"cover", borderRadius: "50% 50%"}: {display: "none"}} src={url}
            onLoad = {() => {setValues({isImageLoaded: true})}}
        />
    </div>
  )
}

export default ProfessionalProfilePhoto

{/* <div style={{height:"150px", width:"150px", margin:"auto", backgroundColor:"#eee", borderRadius: "50% 50%", display:"flex", justifyContent:"center", alignItems: "center"}}>Loading...</div> */}