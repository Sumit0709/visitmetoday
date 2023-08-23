import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, updatePassword } from '../apiCalls/authUser'
import Base from '../core/Base'
import Loading from '../core/Loading';
import { isValidPassword } from '../validationCheck/validate';

const UpdatePassword = () => {

    const loginDetail = isAuthenticated();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        currentPassword: "",
        currentPasswordError: "",
        newPassword: "",
        newPasswordError: "",
        confirmNewPassword:"",
        confirmNewPasswordError:"",

        serverRequestSent: false,
        serverError: false,
        serverSuccess: false
    })

    useEffect(() => {
        if(!loginDetail){
            navigate('/auth/signin',{replace: true})
        }
    },[])

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value, [`${name}Error`]: false, serverError: false})
    }

    const onSubmit = () => {

        let errorObject = {};
        let isErrorFound = false

        if(!isValidPassword(values.currentPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, currentPasswordError: 'Invalid Password'}
        }
        if(!isValidPassword(values.newPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, newPasswordError: 'Invalid Password'}
        }
        if(!(values.newPassword == values.confirmNewPassword)){
            isErrorFound = true;
            errorObject = {...errorObject, confirmNewPasswordError: 'Confirm password should match password'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }

        setValues({...values, serverRequestSent: true, serverError: false, serverSuccess: false})

        updatePassword(loginDetail.token, loginDetail.sessionId, 
            {currentPassword: values.currentPassword, 
            newPassword: values.newPassword, 
            confirmNewPassword: values.confirmNewPassword})
            .then(response => {
                if(response.success){
                    
                    setValues({...values, serverRequestSent: false, serverError: false, serverSuccess: 'Password has been successfully updated. Redirecting...'})
                    setTimeout(() => {
                        navigate('/user/profile')
                    }, 2000);

                    // console.log('Password has been successfully updated, please signin again')
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverError: response.error, serverRequestSent: false, serverSuccess: false})
                    // console.log('Password Update failed')
                    // console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, serverError: 'something went wrong', serverRequestSent: false, serverSuccess: false})
                // console.log(err)
            })
    }

  return (
    <Base>

        <h3 className='text-center m-3'>Reset Password</h3> 

        <div className="form-group pt-4">
            <label htmlFor="currentPassword">current password</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('currentPassword')} value={values.currentPassword} type="password" className="form-control" id="currentPassword" aria-describedby="emailHelp" placeholder="Enter Current Password"/>
            { <div style={values.currentPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.currentPasswordError}</div>}
            
        </div>

        <div className="form-group pt-4">
            <label htmlFor="newPassword">new password</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('newPassword')} value={values.newPassword} type="password" className="form-control" id="newPassword" aria-describedby="emailHelp" placeholder="Enter New Password"/>
            { <div style={values.newPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.newPasswordError}</div>}
        
            <div style={{width:'80%', maxWidth: "400px"}}>{`Enter a combination of atleast six numbers, letters and special characters (such as @ . ! &)`}</div>
            
        </div>
        <div className="form-group pt-4">
            <label htmlFor="confirmNewPassword">confirm new password</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('confirmNewPassword')} value={values.confirmNewPassword} type="password" className="form-control" id="confirmNewPassword" aria-describedby="emailHelp" placeholder="Confirm New Password"/>
            { <div style={values.confirmNewPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.confirmNewPasswordError}</div>}
        </div>
        <div className='text-center mt-4'>
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            { <div style={values.serverSuccess? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverSuccess}</div>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} className='myButton' style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}}>Reset Password</button>
            {values.serverRequestSent? <Loading/> : <></>}
        </div>
    </Base>
  )
}

export default UpdatePassword