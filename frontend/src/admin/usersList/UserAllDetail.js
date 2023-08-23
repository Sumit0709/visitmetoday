import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getAllDetailsOfAUser } from '../../apiCalls/adminApiCalls';
import { isAuthenticated } from '../../apiCalls/authUser';
import Base from '../../core/Base';
import Loading from '../../core/Loading';

const UserAllDetail = () => {

    const navigate = useNavigate();

    const {userId} = useParams();
    const {token, sessionId} = isAuthenticated();

    // console.log(userId);
    const [values, setValues] = useState({
        userDetails: null,

        email: "",
        // verificationId: "",

        serverRequestSent: true,
        serverError: false,
    });

    const [deleteValues, setDeleteValues] = useState({
        showDelete: false,
        serverRequestSent: false,
        serverError: false
    })

    useEffect(() => {
        getAllDetailsOfAUser(token, sessionId,userId)
        .then(res => {

            if(res.success){
                let details = [];

                const email = res.details.email
                // const verificationId = res.verificationId
                
                const timestamp = new Date(res.details.ageInsertedAt);
                const humanReadableTime = timestamp.toLocaleString();
                
                res.details.ageInsertedAt = humanReadableTime;

                for(let key in res.details){
                    let d = [];
                    d.push(key);
                    d.push(res.details[key]);
                    details.push(d);
                }
                // console.log(details);

                setValues({email: email, userDetails: details, serverRequestSent: false, serverError: false});
            }else{
                setValues({...values, userDetails: null, serverRequestSent: false, serverError: res.error});
            }
        })
        .catch(err => {
            setValues({...values,userDetails: null, serverRequestSent: false, serverError: err.message});
        })
    },[])

    // console.log(values);

    const errorMessage = () => {
        return (
            <div> {values.serverError} </div>
        )
    }

    const onDeleteUser = () => {

        setDeleteValues(pre => {
            return {...pre, showDelete:!pre.showDelete, serverError: false, serverRequestSent: true}
        })

        console.log("DELETE");
        deleteUser(token, sessionId, userId)
            .then(res => {
                
                if(res.success){
                    alert("User has been successfully deleted");
                    navigate('/admin/users');
                }
                else{
                    let msg = `ERROR : ${res.error}\nMESSAGE : ${res.message}`;
                    alert(msg);
                    setDeleteValues({...deleteValues, showDelete: false, serverError: true, serverRequestSent: false})
                }
            })
            .catch(err => {
                let msg = `CLIENT ERROR : ${err.message}`;
                alert(msg);
                setDeleteValues({...deleteValues, showDelete: false, serverError: true, serverRequestSent: false})
            })
        
    }

    const onShowDelete = () => {
        setDeleteValues(pre => {
            return {...pre, showDelete:!pre.showDelete}
        })
    }

    const startDeleteUser = () => {
        onDeleteUser();
    }

    const onVerify = () => {
        // console.log(values.verificationId)
        // console.log(values.email)
        navigate(`/admin/users/verify/${userId}`,{state: {email: values.email}})
    }

    const onUpdate = () => {

        navigate(`/admin/users/update/${userId}`);
    }

  return (
    <Base>
        <h1 className='text-center'>User's All Detail</h1>
        {values.serverRequestSent? <Loading/> : 

            values.serverError? errorMessage() : 
            <>

            <button onClick={onShowDelete} className='btn btn-danger m-3'>Delete User</button>
            
            {deleteValues.showDelete? <div className='m-3 p-2 text-center' style={{backgroundColor:'#facbc8', borderRadius:'10px'}}>

                <p>Are you sure that you want to permanently delete this User?</p>
                <small><strong>Note: User's data can't be restored post deletion.</strong></small>
                <div className='text-center'>
                    <button disabled={!deleteValues.showDelete || deleteValues.serverRequestSent} onClick={startDeleteUser}  style={{width:'40%'}} className='btn btn-success m-1'>YES</button>
                    <button disabled={!deleteValues.showDelete || deleteValues.serverRequestSent} onClick={onShowDelete} style={{width:'40%'}} className='btn btn-danger m-1'>NO</button>
                </div>
            </div>
            : <></>
            }

            <div className='text-center'>
                <button style={{width:'40%', marginRight:'5px'}} onClick={onVerify} className='btn btn-success'>Verify</button>
                <button style={{width:'40%'}} onClick={onUpdate} className='btn btn-success'>Update</button>
            </div>
            {values.userDetails.map((detail,idx) => {

                return (
                    <div className='row m-3 p-2' style={{backgroundColor: "#eee", borderRadius: '10px'}} key={idx}>
                        <div className='col-5'>{detail[0]}</div> : 
                        <div className='col-5'>{detail[1]}</div>
                    </div>
                )

            })}

            </>
        }
    </Base>
  )
}

export default UserAllDetail;