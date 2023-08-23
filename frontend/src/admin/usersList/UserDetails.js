import React, { Fragment } from 'react'

const UserDetails = ({index, user, countryCode}) => {

    

  return (
    <Fragment>
        <div className='user_partial_container'>
            <div className='user_partial_sno'>{index+1}</div>
            <div>
    
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Status</div>
                    <div className='user_partial_item_value'>{user.isActive? "Active": "Inactive"}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>User ID</div>
                    <div className='user_partial_item_value'>{user._id}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Email</div>
                    <div className='user_partial_item_value'>{user.email}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Mobile No.</div>
                    <div className='user_partial_item_value'>{`${countryCode[user.mobileNumberCountryCode]} ${user.mobileNumber}`}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Created on</div>
                    <div className='user_partial_item_value'>{user.createdAt}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Last Updated on</div>
                    <div className='user_partial_item_value'>{user.updaupdatedAt}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Role</div>
                    <div className='user_partial_item_value'>{user.role}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>IP Address</div>
                    <div className='user_partial_item_value'>{user.ipAddress}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Profile ID</div>
                    <div className='user_partial_item_value'>{user.profileId}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Verification ID</div>
                    <div className='user_partial_item_value'>{user.verificationId}</div>
                </div>
                <div className='user_partial_item'>
                    <div className='user_partial_item_title'>Session ID</div>
                    <div className='user_partial_item_value'>{user.sessionId}</div>
                </div>
                
            </div>
        </div>
    </Fragment>
  )
}

export default UserDetails;