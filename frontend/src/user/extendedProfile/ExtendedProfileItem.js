import React from 'react'

const ExtendedProfileItem = ({headMessage, iconSrc, id, name, placeholder, checkboxMessage, linkValue, handleChange, handleCheckboxChange, isChecked}) => {

    const iconWidth = '40px';
    const iconHeight = '40px';

    const checkboxId = `show${id.slice(0,1).toUpperCase() + id.slice(1)}`;

    const onHandleChange = (name) => (event) => {
        handleChange(name, event);
    }
    const onHandleCheckboxChange = (name) => (event) => {
        handleCheckboxChange(name,event);
    }

  return (
    <div>
        {/* <div className='mt-4 mb-2'>{headMessage}</div> */}
        <div className="form-group d-flex mt-5">
            <div>
                    <img style={{height: iconHeight, width:iconWidth, objectFit:"contain"}} src={iconSrc} />
                    <div style={{fontSize:'0.8rem'}} className='mt-2'>{name}</div>
            </div>
            <div style={{marginLeft:'20px', width:'100%', maxWidth:'350px'}}>
                <div className="">
                    <input onChange={onHandleChange(`${id}`)} value={linkValue} type="email" className="form-control" id={id} placeholder={placeholder}/>
                </div>
                {/* <div className="w-100"/> */}
                <div className="form-check mt-2 float-right">
                    <input onChange={onHandleCheckboxChange(checkboxId)} checked={isChecked} className="form-check-input" type="checkbox" value="" id={`show${id}`}/>
                    <label className="form-check-label text-muted" htmlFor={`show${id}`}>
                        {checkboxMessage}
                    </label>
                </div>
                
            </div>
        </div>
        {/* {!(name=='email') && <div style={{fontSize: '0.9rem'}} className=''><a href={'#'}>{`show me how to add my ${name} profile link`}</a></div>} */}
    </div>
  )
}

export default ExtendedProfileItem