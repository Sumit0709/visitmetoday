import React, { useState } from 'react'
import { validateTransaction } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';

const ValidatePaymentItem = ({pendingPayment, index}) => {

    const paymentTimeInDateForm = new Date(pendingPayment.paymentTime);
    const paymentTime = paymentTimeInDateForm.toDateString() + "  " +paymentTimeInDateForm.toLocaleTimeString();

    const {token, sessionId} = isAuthenticated();
    const even = index%2==0;

    const [values, setValues] = useState({
        processCompleted: false,
        
        serverError: false,
        serverSucess: false,
        serverRequestSent: false
    })


    const onSubmit = (isValidTransaction) => () => {
        console.log('sasasa')
        setValues({...values, serverError: false, serverSucess: false, serverRequestSent: true});
        validateTransaction(token, sessionId,{pendingTransactionId: pendingPayment._id, isSuccessfullTransaction: isValidTransaction})
            .then(response => {
                console.log(response);

                if(response.success){
                    setValues({...values, processCompleted: true, serverError: false, serverSucess: response.message, serverRequestSent: false})
                }else{
                    setValues({...values, processCompleted: false, serverError: response.error, serverSucess: false, serverRequestSent: false})
                }
            })
            .catch(err => {
                setValues({...values, processCompleted: false, serverError: err.message, serverSucess: false, serverRequestSent: false})
            })


    }


    return (
    <div className='text-center mt-5' style={even?{backgroundColor:'#eee', padding:'20px'}:{padding:'20px'}}>
        <div style={values.processCompleted? {backgroundColor:'black', opacity: '0.4'}: {}}>
        <strong>UTR Number:  </strong>
        <span>{pendingPayment.UTRNumber}</span>
        <div/>

        <strong>Payment Time:  </strong>
        <span>{paymentTime}</span>
        <div/>

        <div className='mt-3'>
            <button disabled={values.processCompleted} onClick={onSubmit(true)} className='btn btn-success' style={{width: '40%', marginRight:'20px'}}>Valid</button>
            <button disabled={values.processCompleted} onClick={onSubmit(false)} className='btn btn-danger' style={{width: '40%'}}>Invalid</button>
        </div>

        </div>
        <h4 className='text-center mt-2' style={values.processCompleted?{}:{display:'none'}}>Process Completed</h4>
        { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
        { <div style={values.serverSucess? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverSucess}</div>}
    </div>
  )
}

export default ValidatePaymentItem;