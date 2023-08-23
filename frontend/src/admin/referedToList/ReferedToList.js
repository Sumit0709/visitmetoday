import React, { useState } from 'react'
import Base from '../../core/Base';
import { isAuthenticated } from '../../apiCalls/authUser';
import { isValidEmail } from '../../validationCheck/validate';
import { getReferedToList } from '../../apiCalls/adminApiCalls';

const ReferedToList = () => {


    const {token, sessionId, role} = isAuthenticated()

    const [values, setValues] = useState({
        email: "",
        emailError: false,
        
        totalRecords: 0,
        doc: null,

        serverSuccess: false,
        serverError: false,
        serverRequestSent: false
    })

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, [`${name}Error`]: false, error: false, errorMessage: "" });
        };

    const onSubmit = (e) => {
        e.preventDefault();

        if(isValidEmail(values.email)){

            setValues({...values, serverRequestSent: true, serverSuccess: false, totalRecords: 0, doc: null});
            
            getReferedToList(token, sessionId, values.email)
            .then(response => {
                console.log(response.totalRecords);

                if(response.success){
                    setValues({...values, serverRequestSent: false, serverError: false, totalRecords: response.totalRecords, doc: response.doc, serverSuccess: true})
                }
                else{
                    setValues({...values, serverRequestSent: false, serverError: response.error, serverSuccess: false})
                }
            })
            .catch(err => {
                console.log(err);
                setValues({...values, serverRequestSent: false, serverError: err.message, serverSuccess: false})
            })
        }
        else{
            setValues({...values, emailError: 'Invalid Email'})
        }
    }

    const headRow = (sno, c1, c2) => {
        return (
            <div className='row' key={sno}>
                <div className='col-md'><strong className='text-center'>{sno}</strong></div>
                <div className='col-md'><strong className='text-center'>{c1}</strong></div>
                <div className='col-md'><strong className='text-center'>{c2}</strong></div>
                {/* <div className='col-md'><span className='text-center'>{c3}</span></div> */}
            </div>
        )
    }

    const row = (sno, c1, c2) => {
        return (
            <div className='row' key={sno}>
                <div className='col-md'><span className='text-center'>{sno}</span></div>
                <div className='col-md'><span className='text-center'>{c1}</span></div>
                <div className='col-md'><span className='text-center'>{c2}</span></div>
                {/* <div className='col-md'><span className='text-center'>{c3}</span></div> */}
            </div>
        )
    }

  return (
    <Base>
        <h1 className='text-center'>Refered To List</h1>

        <form>
            <label htmlFor="email" className='mt-5 mb-3'>Email of the user to search the <strong>refered to</strong> List for</label>
            <div className='row'>
                <div className='col-md'>
                    <input onChange={handleChange("email")} value={values.email} type="email" className="form-control mt-3" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className='col-md'>
                    <button onClick={onSubmit} type="submit" style={{width:'80%', maxWidth:'500px'}} className="myButton mx-auto mt-3 p-2">Search</button>
                </div>

            </div>
            <div className="form-group pt-4">
                
                
                
                
                { <div style={values.emailError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.emailError}</div>}
                
            </div>
            <div className="text-center mt-1">
                { <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>}
                { <div style={values.successMessage? {color: 'green', fontWeight: '500'}: {visibility: 'hidden'}}>{values.successMessage}</div>}
            </div>

        </form>

        {
            values.serverSuccess && <div>
                <h4 className='mb-4'>Total {<strong>{values.totalRecords}</strong>} referals used</h4>
                {headRow("S. No.", "Email", "Referal Code")}
                {values.doc.map((data,index) => {
                    return row(index+1, data.email, data.referalCode)
                })}
            </div>
        }
    </Base>
  )
}

export default ReferedToList;