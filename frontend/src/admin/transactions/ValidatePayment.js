import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getPendingTransactions } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';
import Base from '../../core/Base';
import Loading from '../../core/Loading';
import ValidatePaymentItem from './ValidatePaymentItem';

const ValidatePayment = () => {

    const {token, sessionId, role} = isAuthenticated()
    const navigate = useNavigate();

    const [values, setValues] = useState({
        pendingPayments: [],

        loading: false,

        serverError: false,
        serverRequestSent: false,
    })

    useEffect(() => {

        if(!role || !(role == process.env.REACT_APP_SUPERADMIN)){
            navigate('/');
        }

        setValues({...values, serverRequestSent: true,loading: true})
        loadPendingTransactions();
    },[])

    const loadPendingTransactions = () => {
        getPendingTransactions(token, sessionId)
            .then(response => {
                if(response.success){
                    setValues({...values, pendingPayments: response.pendingTransactions, serverRequestSent: false, serverError: false, loading: false})
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment')
                }
                else{
                    setValues({...values, serverRequestSent: false, serverError:response.error, loading: false})
                    
                }
            })
            .catch(err => {
                setValues({...values, serverRequestSent: false, serverError: 'something went wrong!', loading: false})

            })
    }

    // console.log(values);

  return (
    <Base>

        {
            values.loading? <Loading/> :
            <>
                <h1 className='text-center mt-4'>Pending Transactions</h1>
                {
                    values.serverError? 
                    <div className='text-center'>
                        <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div> 
                    </div>
                    :
                    <div className='text-center'>
                        {
                            values.pendingPayments.length? 
                            values.pendingPayments.map((pendingPayment, index) => {
                                return (
                                    <ValidatePaymentItem key={index} index={index} pendingPayment={pendingPayment}/>
                                )
                            })
                            :
                            <h5 className='text-center mt-5' style={{color: 'blue'}}>No Pending Transactions in database.</h5>
                        }
                    </div>
                }
            </>
        }

    </Base>
  )
}

export default ValidatePayment