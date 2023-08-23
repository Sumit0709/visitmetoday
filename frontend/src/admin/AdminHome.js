
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../apiCalls/authUser'
import Base from '../core/Base';

const AdminHome = () => {

  const {role} = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if(!role || !(role == process.env.REACT_APP_ADMIN || role == process.env.REACT_APP_SUPERADMIN)){
        navigate('/');
    }
  },[])

  const onAllUsers = () => {
    navigate('/admin/users');
  }

  const onUpdatePaymentDetails = () => {
    navigate('/admin/updatePaymentDetails')
  }

  const onVerifyPayments = () => {
    navigate('/admin/validatePayment')
  }

  const onCreateUserAccount = () => {
    navigate('/admin/createUserAccount')
  }

  const onGetReferedToList = () => {
    navigate('/admin/referedToList')
  }

  return (
    <Base>
        <h1 className='text-center mt-5'>ADMIN HOME</h1>

        {/* ALL USERS LIST */}
        {role == process.env.REACT_APP_SUPERADMIN? 
          <div className="text-center mt-5">
            <button onClick={onAllUsers} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">View All Users</button>
        </div>
          :
        <></>
        }

        {/* UPDATE PAYMENT DETAILS */}
        {role == process.env.REACT_APP_SUPERADMIN? 
          <div className="text-center mt-3">
            <button onClick={onUpdatePaymentDetails} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">Update Payment Details</button>
        </div>
          :
        <></>
        }

        {/* VERIFY PAYMENTS */}
        {role == process.env.REACT_APP_SUPERADMIN? 
          <div className="text-center mt-3">
            <button onClick={onVerifyPayments} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">Verify Payment</button>
        </div>
          :
        <></>
        }

        {/* CREATE USER ACCOUNT */}
        {role == process.env.REACT_APP_ADMIN || role == process.env.REACT_APP_SUPERADMIN? 
          <div className="text-center mt-3">
            <button onClick={onCreateUserAccount} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">Create User Account</button>
        </div>
          :
        <></>
        }

        {role == process.env.REACT_APP_ADMIN || role == process.env.REACT_APP_SUPERADMIN? 
          <div className="text-center mt-3">
            <button onClick={onGetReferedToList} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 mb-4">Get Refered To List</button>
        </div>
          :
        <></>
        }


    </Base>
  )
}

export default AdminHome