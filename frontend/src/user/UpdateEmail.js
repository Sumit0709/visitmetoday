import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, updateEmail, updatePassword } from '../apiCalls/authUser'
import Base from '../core/Base'
import { isValidEmail, isValidPassword } from '../validationCheck/validate';

const UpdateEmail = () => {

    const loginDetail = isAuthenticated();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        currentPassword: "",
        currentPasswordError: false,
        newEmail: "",
        newEmailError: false,
        
        serverRequestSent: false,
        serverError: false
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
        if(!isValidEmail(values.newEmail)){
            isErrorFound = true;
            errorObject = {...errorObject, newEmailError: 'Invalid email'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }

        setValues({...values, serverRequestSent: true})

        updateEmail(loginDetail.token, loginDetail.sessionId, 
            {
                currentPassword: values.currentPassword,
                newEmail: values.newEmail
            })
            .then(response => {
                if(response.success){
                    console.log('Email has been successfully updated, please signin again')
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverError:response.error, serverRequestSent: false})
                    console.log('Email Update failed')
                    console.log(response.error)
                }
            })
            .catch(err => {
                setValues({...values, serverError:'something went wrong', serverRequestSent: false})
                console.log(err)
            })
    }

  return (
    <Base>

        <h3 className='text-center m-3'>Update Email Id</h3> 

        <div className="form-group pt-4">
            <label htmlFor="currentPassword">password</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('currentPassword')} value={values.currentPassword} type="password" className="form-control" id="currentPassword" aria-describedby="emailHelp" placeholder="Enter Current Password"/>
            { <div style={values.currentPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.currentPasswordError}</div>}
        </div>

        <div className="form-group pt-4">
            <label htmlFor="newEmail">new email id</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('newEmail')} value={values.newEmail} type="email" className="form-control" id="newEmail" aria-describedby="emailHelp" placeholder="Enter New email id"/>
            { <div style={values.newEmailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.newEmailError}</div>}
        </div>
        
        <div className='text-center mt-4'>
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton' >Update Email id</button>
        </div>
    </Base>
  )
}

export default UpdateEmail