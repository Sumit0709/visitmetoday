import React from 'react'

import './CardSection.css'

const CardSectionHeading = ({src, goTo, heading, description}) => {
  return (
    <div className='card_container_2'>
        <div className="card_section_heading row" onClick={goTo}>
            <div className='text-center col-md' style={{marginBottom:'25px'}}>
                <img src={src}/>
            </div>
            <div className='card_section_heading_head col-md'>
                <h3 className=''>{heading}</h3>
            </div>
        </div>
    </div>
  )
}

export default CardSectionHeading;