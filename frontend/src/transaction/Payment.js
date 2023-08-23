import { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../apiCalls/authUser";
import { getPaymentDetails, getPaymentQR, paymentDone } from "../apiCalls/transaction";
import Base from "../core/Base";
import Loading from "../core/Loading";
import Card from "../user/customUrl/Card";



const Payment = () => {

    const url = 'gaasvd'
    const [values, setValues] = useState({
        isVerdictGiven: false,

        upiId: '',
        mobileNumber: '',
        name: '',
        qrCode: '',

        UTRNumber: '',
        UTRNumberError: false,

        serverRequestSent: false,
        serverError: false,
        serverSuccess: false,
        qrCodeError: false
    })
    const {token, sessionId} = isAuthenticated();

    useEffect(() => {
        onGetPaymentDetails();
    },[])

    const onGetPaymentDetails = () => {
        getPaymentDetails(token,sessionId)
            .then(response => {
                if(response.success){
                    onGetPaymentQR(response.upiId, response.mobileNumber, response.name);
                }else{
                    setValues({...values, isVerdictGiven: true, 
                        upiId: 'Failed to Fetch UPI id',
                        mobileNumber: 'Failed to Fetch mobile number',
                        name: 'Failed to Fetch name'
                    })
                }
            })
            .catch(err => {
                setValues({...values, isVerdictGiven: true, 
                    upiId: 'Failed to Fetch UPI id',
                    mobileNumber: 'Failed to Fetch mobile number',
                    name: 'Failed to Fetch name'
                })
            })
    }

    const onGetPaymentQR = (upiId, mobileNumber, name) => {

        getPaymentQR(token, sessionId)
            .then(blob => {
                if(blob && blob.success == false){
                    setValues({...values, isVerdictGiven: true, upiId: upiId, mobileNumber: mobileNumber, name: name});
                }
                else{
                    const objectURL = URL.createObjectURL(blob);
                    var file = new File([blob], "visitmeToday_payment.png", {type: 'image/png'});
                    var tempFiles = [file];

                    setValues({...values, isVerdictGiven: true, upiId, mobileNumber, name, qrCode: objectURL})
                }
            })
            .catch(err => {
                setValues({...values, upiId, mobileNumber, name})
                console.log('something went wrong')
                console.log(err)
            })
    }

    // console.log(values);

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, [`${name}Error`]: false, serverError:false });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        setValues({...values, serverRequestSent: true, serverError: false, serverSuccess: false})

        paymentDone(token, sessionId, values.UTRNumber)
            .then(response => {
                if(response.success){
                    setValues({...values, serverRequestSent: false, serverError: false, serverSuccess: response.message})
                }else{
                    setValues({...values, serverRequestSent: false, serverError: response.error, serverSuccess: false})
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong!', serverSuccess: false})
            })

    }

    return (
        <Base>
            <div>
                <h1 className="text-center">Make Payment</h1>
                <h4 className="text-center" style={{color: 'red'}}>Make sure that you are making a payment of exactly Rs. 100.00 only.</h4>
            { !values.isVerdictGiven? <Loading/> :
            
                
                <>
                <Card url={values.qrCode}/>

                <div className="text-center mt-5">
                    <span>UPI ID :</span>
                    <strong style={{paddingLeft: '20px'}}>{values.upiId}</strong>
                    <div className="mb-3"/>

                    <span>Name :</span>
                    <strong style={{paddingLeft: '20px'}}>{values.name}</strong>
                    <div className="mb-3"/>

                    <span>Mobile Number :</span>
                    <strong style={{paddingLeft: '20px'}}>{values.mobileNumber}</strong>
                    <div className="mb-3"/>
                </div>

                <div className="">

                <div className="col-sm-7 col-md-6 col-lg-5 mt-5">
                    <small>Enter your UTR Number : </small>
                    <input type="text" onChange={handleChange("UTRNumber")} className="form-control" id="UTRNumber" placeholder="Enter UTR Number" value={values.UTRNumber}/>
                </div>
                </div>

                <div className=" mt-4">
                    { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
                    { <div style={values.serverSuccess? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverSuccess}</div>}
                    
                    {values.serverRequestSent && <Loading/>}
                    <button disabled={values.serverRequestSent || values.UTRNumber==''} onClick={onSubmit} style={values.serverRequestSent || values.UTRNumber==''?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{ maxWidth:'400px', marginTop:'10px'}} className="myButton p-1 mt-2">I have completed my Payment</button>
                    <div/>
                    <small><strong>NOTE: </strong> Make sure you have entered correct UTR Number</small>
                </div>

                
                <div className="mt-5 pt-5">

                    <h5 style={{color:'red'}} className='mb-2'>How it works - </h5>
                    <div className="mt-4">
                        <strong>Step 1 : </strong> You Scan the QR code or enter UPI Id and make payment successfully.
                    </div>
                    <div className="mt-4">
                        <strong>Step 2 : </strong> After you have successfully made the payment, enter UTR Number in the above provided box and submit using <strong>I have completed my Payment</strong> button (Make sure you have entered the UTR Number correctly).
                    </div>
                    <div className="mt-4">
                        <strong>Step 3 : </strong> After you have completed Step 2, Your job is done. Now someone from our team will verify the payment and activate your account (It takes upto 24hr.).
                    </div>
                </div>

                </>
            }
            </div>
            
        </Base>
    )
}

export default Payment;