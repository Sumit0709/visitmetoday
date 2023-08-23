import React, { useEffect, useState } from 'react'
import { getCardFromUrl } from '../apiCalls/profile'
import { useLocation, useParams } from 'react-router-dom';
import Card from './customUrl/Card';
import Loading from '../core/Loading';

import downloadIcon from '../media/download.svg'
import Base from '../core/Base';

const UserCard = () => {

    const location = useLocation()
    const {profileUrl} = useParams();

    const [cardData, setCardData] = useState({
        cardUrl: false,
        filesArray: [],
        shareStarted: false,

        serverError: false
    })

    useEffect(() => {
        onGetCardFromUrl();
    },[])

    const onGetCardFromUrl = async () => {
        getCardFromUrl(profileUrl)
        .then(blob => {
            if(blob && blob.success == false){
                setCardData({
                    ...cardData,
                    cardUrl: false
                })
            }
            else{
                const objectURL = URL.createObjectURL(blob);
                var file = new File([blob], "card.png", {type: 'image/png'});
                var tempFiles = [file];


                setCardData({
                    ...cardData,
                    cardUrl: objectURL,
                    filesArray: tempFiles
                })
                // setValues({error: false, cardUrl: objectURL, filesArray: tempFiles, isVerdictGiven: true, cardRequestSent: false, referalCode: referalCode, visitCounter: visitCounter})
            }
        })
        .catch(err=> {
            setCardData({...cardData, serverError: 'Something went wrong!'})
        })
    }

  return (
    <Base>
        { cardData.cardUrl? 
            <div style={{maxWidth:'350px', margin:'auto', marginBottom:'50px'}}>
                <Card url={cardData.cardUrl}/>
                <div className='text-center mt-3'>
                    <a disabled={cardData.shareStarted} style={cardData.shareStarted? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '100%', maxWidth: '350px'}: {width: '100%', maxWidth: '350px'}} className='download_card' href={cardData.cardUrl} download={'E-Visiting Card'}>DOWNLOAD CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={downloadIcon}/></a>
                </div>
                {/* <div className='text-center mt-3 mb-5'>
                <button disabled={cardData.shareStarted} onClick={onShareCard} style={cardData.shareStarted? {backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5', width: '100%', maxWidth: '350px', fontWeight:'500'}: {fontWeight:'500', width: '100%', maxWidth: '350px'}} className='download_card' href={cardData.cardUrl} download='visiting_card'>SHARE CARD<img className="" style={{marginLeft:'20px', width:"20px", height:"20px", alignItems:'baseline'}} src={shareIcon}/></button>
                </div> */}
            </div>
            : <div>
                {cardData.serverError? 
                    <div style={cardData.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{cardData.serverError}</div>
                :<Loading/>}
              </div>
        }
    </Base>
  )
}

export default UserCard;