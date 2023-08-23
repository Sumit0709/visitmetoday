import React from 'react'

export default function VerificationItem({handleCheckboxChange, idx, isVerified, isChecked, name, value}) {

    const onHandleCheckboxChange = (name) => (event) => {
        handleCheckboxChange(name, event.target.checked);
        // setVerificationDetails({ ...verificationDetails, [name]: event.target.checked});
    }
    const bgColor = value===""? "#abaeb3": idx%2==0? "#eee": "#ffffff";

  return (
    <div disabled={value===""} style={{backgroundColor: bgColor, padding:'10px', marginTop:'8px', borderRadius: '10px'}}>
        <div style={{display:'flex', justifyContent: "space-between"}}>
            <h6>{name}</h6>
            <div>{value}</div>
            {/* <div>{isVerified? "Verified": "Not Verified"}</div> */}
            <div className="form-check" style={{}}>
                <label className="form-check-label text-muted" htmlFor={name}>
                    {isVerified? "Verified": "Not Verified"}
                </label>
                <input style={{fontSize:'20px'}} disabled={value===""} onChange={onHandleCheckboxChange(name)} checked={isChecked} className="form-check-input" type="checkbox" value="" id={name}/>
            </div>
        </div>
    </div>
  )
}
