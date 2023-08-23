import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateActiveStatus } from '../../apiCalls/adminApiCalls'
import { isAuthenticated } from '../../apiCalls/authUser'

import './UserPartialDetail.css'

const UserPartialDetails = ({index, user}) => {

    const {token, sessionId} = isAuthenticated();
    const [isActive, setIsActive] = useState(user.isActive)
    const [isActiveError, setIsActiveError] = useState(false);

    const [askConfirmation, setAskConfirmation] = useState(false);

    const navigate = useNavigate();

    const onUpdateActiveStatus = () => {
        // console.log(isActive)
        setIsActiveError(false);

        updateActiveStatus(token, sessionId, user._id, !isActive)
            .then(response => {
                if(response.success){
                    setIsActive(response.updatedIsActive)
                }
                else{
                    console.log(response)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // const onVerify = () => {
    //     navigate(`verify/${user.verificationId}`,{state: {email: user.email}})
    // }

    const onAllDetails = () => {
        navigate(`allDetails/${user._id}`);
    }

    const onCloseConfirm = () => {
        setAskConfirmation(false);
    }

    const onConfirmActiveStatus = () => {
        setAskConfirmation(false);
        onUpdateActiveStatus();
    }

    const onShowConfirm = () => {
        setAskConfirmation(oldVal => !oldVal);
    }

  return (
    <Fragment>
        <div className='user_partial_container'>
            <div className='user_partial_sno'>{index}</div>
            <div className='user_partial_container_2'>
                <div className='user_partial_items'>
                    <div className='user_partial_item'>
                        {/* <div className='user_partial_item_title'>Email</div> */}
                        <div className='user_partial_item_value'>{user.email}</div>
                    </div>
                    <div className='user_partial_item'>
                        {/* <div className='user_partial_item_title'>Mobile no.</div> */}
                        <div className='user_partial_item_value'>{user.mobileNumber}</div>
                    </div>
                    
                </div>
                <div className='user_partial_buttons'>
                    {/* <button className='btn'>{user.isActive? 'Deactivate': 'Activate'}</button> */}
                    { isActive? <button onClick={onShowConfirm} className='btn btn-danger'>Deactivate</button>: <button onClick={onShowConfirm} className='btn btn-success'>Activate</button>}
                    {/* { isActive? <button onClick={onVerify} className='btn btn-success'>Verify</button>: <></>} */}
                    {/* { isActive? <button className='btn btn-success'>Update</button>: <></>} */}
                    <button onClick={onAllDetails} className='btn btn-success'>All Detail</button>
                </div>
            {isActiveError? <p>Failed to update active status</p>: <></>}
            {askConfirmation? <div>
                <p className='m-1 mt-4 text-center'>Are You sure you want to <strong> {isActive? `deactivate`: `activate`} </strong> this user?</p>
                <div className='text-center'>
                    <button disabled={!askConfirmation} onClick={onConfirmActiveStatus} style={{width:'40%'}} className='btn btn-success m-1'>YES</button>
                    <button disabled={!askConfirmation} onClick={onCloseConfirm} style={{width:'40%'}} className='btn btn-danger m-1'>NO</button>
                </div>
            </div> :
            <></>
            }
            </div>
        </div>
    </Fragment>
  )
}

export default UserPartialDetails;