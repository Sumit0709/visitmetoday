import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, updateEmail, updateMobileNumber, updatePassword } from '../apiCalls/authUser'
import { getCountryAndCodeList } from '../apiCalls/inputList';
import Base from '../core/Base'
import { isValidMobileNumber, isValidPassword } from '../validationCheck/validate';

const UpdateMobileNumber = () => {

    const loginDetail = isAuthenticated();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        currentPassword: "",
        currentPasswordError: false,
        newMobileNumberCountryCode: 0,
        newMobileNumber: '',
        newMobileNumberError: false,
        mobileNumberCountryCodes: [],

        serverRequestSent: false,
        serverError: false
    })

    useEffect(() => {
        if(!loginDetail){
            navigate('/auth/signin',{replace: true})
        }

        getCountryAndCodeList()
            .then(data => {
                setValues({...values, mobileNumberCountryCodes: data.mobileNumberCountryCodes})
            })
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
        if(!isValidMobileNumber(values.newMobileNumber)){
            isErrorFound = true;
            errorObject = {...errorObject, newMobileNumberError: 'Invalid mobile number'}
        }

        if(isErrorFound){
            setValues({...values, ...errorObject});
            return;
        }

        setValues({...values, serverRequestSent: true})


        updateMobileNumber(loginDetail.token, loginDetail.sessionId, 
            {
                currentPassword: values.currentPassword,
                newMobileNumberCountryCode: values.newMobileNumberCountryCode,
                newMobileNumber: values.newMobileNumber
            })
            .then(response => {
                if(response.success){
                    console.log('Mobile Number has been successfully updated, please signin again')
                }
                else if(response.error == 'PLAN_EXPIRED'){
                    navigate('/auth/payment');
                }
                else{
                    setValues({...values, serverError:response.error, serverRequestSent: false})
                    console.log('Mobile Number Update failed')
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

        <h3 className='text-center m-3'>Update Mobile Number</h3> 

        <div className="form-group pt-4">
            <label htmlFor="currentPassword">password</label>
            <input style={{width:'80%', maxWidth: "400px"}} onChange={handleChange('currentPassword')} value={values.currentPassword} type="password" className="form-control" id="currentPassword" aria-describedby="emailHelp" placeholder="Enter Current Password"/>
            { <div style={values.currentPasswordError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.currentPasswordError}</div>}
        </div>

        <div className="row pt-4">
            <div className="form-group col-12">
                <label htmlFor="newMobileNumber">new mobile number</label>
            </div>
            <div className="form-group col-3">
                <select onChange={handleChange("newMobileNumberCountryCode")} value={values.newMobileNumberCountryCode} id="newMobileNumberCountryCode" className="form-control">
                    {values.mobileNumberCountryCodes.map((countryCode, index) => {
                        return (
                            <option key={index} value={index}>{countryCode}</option>
                        )
                    })}
                </select>
                
            </div>
            <div className="form-group col-9">
                
                <input onChange={handleChange("newMobileNumber")} value={values.newMobileNumber} type="number" className="form-control" id="newMobileNumber" aria-describedby="mobileNumberHelp" placeholder="Enter your mobile number"/>
                { <div style={values.newMobileNumberError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.newMobileNumberError}</div>}
            </div>
        </div>
        
        <div className='text-center mt-4'>
            { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
            <button disabled={values.serverRequestSent} onClick={onSubmit} style={values.serverRequestSent?{ backgroundColor: 'rgb(65, 57, 57)', opacity:'0.5' ,maxWidth:'400px', marginTop:'10px'}:{maxWidth:'400px', marginTop:'10px'}} className='myButton' >Update mobile number</button>
        </div>
    </Base>
  )
}

export default UpdateMobileNumber