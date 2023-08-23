const API = process.env.REACT_APP_SERVER_API

export const getAllUsers = (token, sessionId, queryParams) => {

    let url = new URL(`${API}/admin/getAllUsers/${sessionId}`);

    Object.keys(queryParams).forEach(key => {
        if(queryParams[key] != null){
            url.searchParams.append(key, queryParams[key])
        }
    })


    // console.log(url);
    return fetch(url,{
        method: "GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        // console.log(response);
        return response.json()
    })
    .then(response => {
        // console.log(response)
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updateActiveStatus = (token, sessionId, user_id, updatedActiveStatus) => {
    
    return fetch(`${API}/admin/updateActiveStatus/${sessionId}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
            user_id: user_id, 
            updatedActiveStatus: updatedActiveStatus
        })
        })
        .then(response => response.json())
        .then(response => {
            return response
        })
        .catch(err => {
            return {success: false}
        })

}

export const getVerificationdetails = (token, sessionId, userId) => {

    let url = `${API}/admin/getVerificationDetails/${sessionId}/${userId}`;

    // let url = new URL(`${API}/admin/getVerificationDetails/${sessionId}/${userId}`);
    // url.searchParams.append('userId', userId)

    return fetch(url,{
        method: "GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .then(response => {
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updatePaymentDetails = (token, sessionId, formData) => {
    return fetch(`${API}/admin/updatePaymentDetails/${sessionId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
    })
    .then(async (res) => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        console.log("Error while updating payment details profile")
        console.log(err);
        return {
            success: false
        }
    })
}

export const getPendingTransactions = (token, sessionId) => {
    return fetch(`${API}/admin/getPendingTransactions/${sessionId}`,{
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const validateTransaction = (token, sessionId, body) => {
    return fetch(`${API}/admin/validateTransaction/${sessionId}`,{
        method: 'POST',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return {
            success: false
        }
    })
}

export const createUserAccount = (token, sessionId, user, isCaptain) => {

    // console.log('CREATE ACCOUNT')
    // console.log(user);
   
    const userData = isCaptain? user: {
        ...user,
        isCreatedByAdmin: process.env.REACT_APP_IS_CREATED_BY_ADMIN,
        referedBy: process.env.REACT_APP_REFERRED_BY_CHANDAN
    }
    // console.log(userData);
    
    return fetch(`${API}/superAdmin/createAccountForUser/${sessionId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const getAllDetailsOfAUser = async(token, sessionId, userId) => {

    // console.log(userId);

    return fetch(`${API}/admin/getAllDetailsOfAUser/${sessionId}/${userId}`,{
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        // body: JSON.stringify(userId)
    })
    .then(res => res.json())
    // .then(res => console.log(res))
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const getReferedToList = async (token, sessionId, email) => {
    return fetch(`${API}/admin/getReferedToList/${sessionId}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({email: email})
    })
    .then(res => res.json())
    // .then(res => console.log(res))
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const getUserDetailsToUpdate = async(token, sessionId, userId) => {

    return fetch(`${API}/admin/getUserDetailsToUpdate/${sessionId}/${userId}`,{
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const deleteUser = async (token, sessionId, userId) => {
    
    return fetch(`${API}/admin/deleteUser/${sessionId}/${userId}`,{
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        // body: JSON.stringify(userId)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
} 


export const updateBasicProfile = async (token, sessionId, userId, userBody) => {
    return fetch(`${API}/admin/updateBasicProfile/${sessionId}/${userId}`,{
        method: 'PUT',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const updateExtendedProfile = async (token, sessionId, userId, userBody) => {
    return fetch(`${API}/admin/updateExtendedProfile/${sessionId}/${userId}`,{
        method: 'PUT',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const updateVerification = async (token, sessionId, userId, userBody) => {
    return fetch(`${API}/admin/updateVerification/${sessionId}/${userId}`,{
        method: 'PUT',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}