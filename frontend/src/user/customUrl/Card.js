import React, {useState, useEffect, Fragment} from 'react'
import { isAuthenticated } from '../../apiCalls/authUser';
import { getCard, updateCard } from '../../apiCalls/profile';
import Loading from '../../core/Loading';

const Card = ({profileUrl, url}) => {

    const {sessionId, token } = isAuthenticated();
    const hasWindow = typeof window !== 'undefined';
    const [isImageLoaded, setIsImageLoaded] = useState(false);


//   const getWindowDimensions =() => {
//     const width = hasWindow ? window.innerWidth : null;
//     const height = hasWindow ? window.innerHeight : null;
//     return {
//       width,
//       height,
//     };
//   }

//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//   const [cardWidth, setCardWidth] = useState("400px")

//   useEffect(() => {
//     if (hasWindow) {
//       function handleResize() {
//         setWindowDimensions(getWindowDimensions());
//       }

//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, [hasWindow]);

    if(!url) url = `${process.env.REACT_APP_SERVER_API}/getCard/${profileUrl}`;


  const onUpdateCard = () => {
    updateCard(token,sessionId)
        .then(response => {
            if(response.success){
                console.log("CARD UPDATED")
                window.location.reload(false);
            }
            else{
                console.log("CARD NOT UPDATED")
                console.log("ELSE - ")
                console.log(response.error)
            }
        })
        .catch(err => {
            console.log("CARD NOT UPDATED")
            console.log(err.message);
        })
  }

  return (
    <div className="text-center" style={{justifyContent: "center"}}>
        <div className="card mx-auto text-center mt-4" style={{ width: "100%", maxWidth:"350px"}}>
            
            {
                isImageLoaded? null: <div><Loading/></div>
            }
            
            <img className="card-img-top" src={url} style={isImageLoaded? {}: {display:"none"}}
                onLoad = {() => {setIsImageLoaded(true)}}    
            />
        </div>
        
    </div>
  )
}

export default Card;

// style={{ width:"160x", height:"90px", backgroundImage: `url(${url})`, backgroundSize:"contain", backgroundRepeat:"no-repeat"}}