import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser'
import { getCountryAndCodeList } from '../../apiCalls/inputList';
import Base from '../../core/Base';
import Loading from '../../core/Loading';
import UserDetails from './UserDetails';
import UserPartialDetails from './UserPartialDetail';

import './UserPartialDetail.css'

const UsersList = () => {

  const {token, sessionId, role} = isAuthenticated();
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    usersList: null,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: false,
    currentPage: 1,
    role: 0,

    randomPageValue: '',

    serverRequestSent: true,
    serverError: false,
  })


  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: null,
    role: null,
    isActive: null
  })

    const onGetAllUsers = (goToPage = 1) => {

      const newQueryParams = {...queryParams, page: goToPage};
      setQueryParams(newQueryParams);

      getAllUsers(token,sessionId, newQueryParams)
        .then(res => {
          // console.log(res);
          if(res.success){
            setValues({...values, randomPageValue:'', hasPrevPage: res.hasPrevPage, hasNextPage: res.hasNextPage, totalPages: res.totalPages, currentPage: res.currentPage, usersList: res.users, serverError: false, serverRequestSent:false});
            
          }
          else{
            setValues({...values, randomPageValue:'', serverError: res.error, serverRequestSent: false})
          }
        })
        .catch(err => {
          setValues({...values, randomPageValue:'', serverError: err.message, serverRequestSent: false})
          console.log(err);
        })
    }


    useEffect(() => {
      if(!role || !(role == process.env.REACT_APP_ADMIN || role == process.env.REACT_APP_SUPERADMIN)){
          navigate('/');
      }
      onGetAllUsers();
    },[])

    const onNextPage = () => {
      if(values.currentPage == values.totalPages)
        return;
      setValues({...values, usersList: null, serverRequestSent: true, serverError: false});
      onGetAllUsers(values.currentPage+1);
    }
    const onPrevPage = () => {
      if(values.currentPage == 1)
        return;
      setValues({...values, userList: null, serverRequestSent: true, serverError: false})
      onGetAllUsers(values.currentPage-1);
    }

    const onRandomPage = (e) => {
      const newPage = values.randomPageValue;
      console.log(newPage);

      if(newPage<1 || newPage>values.totalPages){
        alert('Entered Page number is not valid!');
        return;
      }
      setValues({...values, userList: null, serverRequestSent: true, serverError: false})
      onGetAllUsers(newPage);
    }


    const onRandomPageChange = (e) => {
      setValues({...values, randomPageValue: e.target.value});
    }

  return (
    <Base>
      <h2 className='text-center m-5 mt-2'>User's List</h2>


      
      { values.serverRequestSent? <Loading/> : 
      <div>
        {values.serverError? 
        <div style={values.serverError? {color: 'red', fontWeight: '500'}: {visibility: 'hidden'}}>{values.serverError}</div>
          :    
        values.usersList.map((user, index) => {
          return (
            // <UserDetails key={index} index={index} user={user} countryCode={values.countryCode}/>
            <UserPartialDetails key={index} index={index} user={user}/>
          )
        })
        }

        <div className='mt-5' style={{display:'flex', justifyContent:'space-between'}}>
          {values.hasPrevPage?<button onClick={onPrevPage} disabled={values.serverRequestSent} className='btn btn-primary'>Prev</button>: <div></div>}
          
          <div className="input-group" style={{width:'50%'}}>
            <input onChange={onRandomPageChange} type="text" className="form-control text-center" value={values.randomPageValue} placeholder={`Page ${values.currentPage} of ${values.totalPages}`}/>
            {/* <span style={{fontSize:'1.2rem', marginLeft:'10px'}}> of {values.totalPages} Pages</span> */}
            <div className="input-group-append" style={{margin:'0 10px'}}>
              <button onClick={onRandomPage} disabled={values.serverRequestSent} className="btn btn-outline-secondary" type="button" id="button-addon2">Go</button>
            </div>
          </div>

          {values.hasNextPage? <button onClick={onNextPage} disabled={values.serverRequestSent} className='btn btn-primary'>Next</button>:<div></div>}
        </div>
      </div>
      }
    </Base>
  )
}

export default UsersList;