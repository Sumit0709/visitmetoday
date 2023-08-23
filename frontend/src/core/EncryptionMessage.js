import React from 'react'

import ssl from '../media/ssl.png'
import sha256 from '../media/sha256.png'
import variable from '../variable'


const EncryptionMessage = () => {

    const iconWidth = "30px"
    const iconHeight = "30px"

  return (
    <>
        <div style={{display: 'flex', justifyContent:'center'}}>
            <span className='m-2'><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={ssl} /></span>
            <span className='m-2'><img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={sha256} /></span>
        </div>
        <div style={{fontSize:'0.6rem'}}>{variable.domain} is secured</div>
        <div style={{fontSize:'0.6rem'}}>by 256 Bit Encryption</div>
    </>
  )
}

export default EncryptionMessage