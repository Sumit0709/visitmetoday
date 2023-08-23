import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updatePaymentDetails } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser'
import Base from '../../core/Base';
import variable from '../../variable';

import upload from '../../media/upload.png'
import Loading from '../../core/Loading';

const UpdatePaymentDetails = () => {

    const {token, sessionId, role} = isAuthenticated();
    const navigate = useNavigate();

    useEffect(()=>{
        if(role != process.env.REACT_APP_SUPERADMIN){
            navigate('/admin/home');
        }
    },[])

    const [values, setValues] = useState({
        upiId: '',
        upiIdError: false,
        name: '',
        nameError: false,
        qrCode: '',
        qrCodeError: false,
        mobileNumber: '',
        mobileNumberError: false,
        formData: new FormData(),

        serverError: false,
        serverRequestSent: false
    })

    const handleChange = (name) => (event) => {
        const value = name === "qrCode"? event.target.files[0]: event.target.value;

        values.formData.set(name,value);
        setValues({ ...values, error: false, [name]: value, [`${name}Error`]: false, serverError:false });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({...values, serverRequestSent: true, serverError: false});

        updatePaymentDetails(token,sessionId, values.formData)
            .then(response => {
                console.log(response);
                if(response.success){

                    setValues({...values, serverRequestSent: false, serverError: false});
                    alert("Payment details updated successfully")
                    
                }else{
                    setValues({...values, serverRequestSent: false, serverError: response.error});
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong!'});
            })
    }

  return (
    <Base>

        <h2 className='text-center mt-3'>Update Payment Details</h2>

        <div className='mt-5'>        
            <div className='mb-1'>Upload New QR Code<span style={{color: 'red', fontWeight: '800'}}>*</span></div>
            <input onChange={handleChange("qrCode")} type="file" id="qrCode" />
            <label htmlFor="qrCode" className="qrCode"><img style={{width:'35px', height:'35px'}} src={upload}/></label>
            <span style={{marginLeft: '10px', fontWeight:500}}>{values.qrCode? values.qrCode.name: "Choose new qrCode image..."}</span>
        </div>

        <div className="col-sm-7 col-md-6 col-lg-5 mt-5">
            <small>Name: </small>
            <input type="text" onChange={handleChange("name")} className="form-control" id="name" placeholder="Enter Name To Be Shown" value={values.name}/>
            { <div style={values.nameError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.nameError}</div>}
        </div>

        <div className="col-sm-7 col-md-6 col-lg-5 mt-5">
            <small>UPI ID: </small>
            <input type="text" onChange={handleChange("upiId")} className="form-control" id="upiId" placeholder="Enter UPI ID To Be Shown" value={values.upiId}/>
            { <div style={values.upiIdError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.upiIdError}</div>}
        </div>

        <div className="col-sm-7 col-md-6 col-lg-5 mt-5">
            <small>Mobile Number: </small>
            <input type="text" onChange={handleChange("mobileNumber")} className="form-control" id="mobileNumber" placeholder="Enter Mobile Number To Be Shown" value={values.mobileNumber}/>
            { <div style={values.mobileNumberError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.mobileNumberError}</div>}
        </div>
        
        <div className="text-center mt-4">
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            
            {values.serverRequestSent && <Loading/>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className="myButton p-1 mt-2">Update Payment Details</button>
            
        </div>

    </Base>
  )
}

export default UpdatePaymentDetails;