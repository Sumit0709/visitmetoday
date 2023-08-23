import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

import "./Navigating.css"

const Navigating = ({message, alertClassName="alert-info"}) => {

  const messageBox  = () => {
    return (
        <div className={`alert ${alertClassName} mt-3 text-center`}
        style={{width:"80%", maxWidth:"400px", margin:"auto", padding:"4px"}}
        >
            <h6>{message}</h6>
        </div>
    )
  }

return (
    <div className={`navigating_container`}>
        <div className='mt-4'>
          <Loading/>
        </div>
        {messageBox()}
    </div>
  )
}

export default Navigating