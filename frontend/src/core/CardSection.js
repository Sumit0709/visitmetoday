import React from 'react'

import './CardSection.css'

const CardSection = ({src, goTo, heading, description}) => {
  return (
    <div className='card_container'>
        <div className="card_section" onClick={goTo}>
            <div className='text-center'>
                <img src={src}/>
            </div>
            <h3>{heading}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default CardSection;