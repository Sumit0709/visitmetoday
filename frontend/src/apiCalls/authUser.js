const API = process.env.REACT_APP_SERVER_API

export const signup = (user) => {
    // console.log(user);

    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(async res => {
        const  response = await res.json();
        // console.log(response)
        return response
    })
    .catch(err => {
        console.log(err)
    })
}

export const signin = (loginDetails) => {
    return fetch(`${API}/signin`,{
        method: "POST",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginDetails)
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        console.log(err);
        return {success: false, error: 'something went wrong!'}
    })
}

export const signout = () => {
    if(typeof window != "undefined"){

        return fetch(`${API}/signout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(async(res)=>{
            const response = await res.json();
            localStorage.removeItem("visitmetoday_data");
            return response
        })
        .catch((err) => {
            console.log(err.message);
            return {
                success: false
            }
        });
    }
}

// save token and sessionId into local storage
export const authenticate = (data, next) => {
    if(typeof window != "undefined"){
        localStorage.setItem("visitmetoday_data", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("visitmetoday_data")){
        return JSON.parse(localStorage.getItem("visitmetoday_data"))
    }
    else return false;
}


export const verifyOtp = (emailOrMobile, otpFor, otpValue) => {
    const urlFor = ['forgotPassword', 'verifyEmail', 'verifyMobileNumber']

    return fetch(`${API}/${urlFor[otpFor]}/verifyOtp`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailOrMobile: emailOrMobile,
            otpFor: otpFor,
            otpValue: otpValue
        })
    })
    .then(response => response.json())
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err);
        return {
            success: false
        }
    })
}


export const generateOtp = (emailOrMobile, otpFor) => {

    const urlFor = ['forgotPassword', 'verifyEmail', 'verifyMobileNumber']

    return fetch(`${API}/${urlFor[otpFor]}/generateOtp`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailOrMobile: emailOrMobile,
            otpFor: otpFor
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        return response
    })
    .catch(err => {
        console.log(err);
        return {
            success: false
        }
    })
}

export const verifyOtpForForgotPassword = (emailOrMobile, otpFor, otpValue, newPassword, confirmNewPassword) => {
    // const urlFor = ['forgotPassword', 'verifyEmail', 'verifyMobileNumber']

    return fetch(`${API}/forgotPassword/verifyOtp`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailOrMobile: emailOrMobile,
            otpFor: otpFor,
            otpValue: otpValue,
            newPassword: newPassword,
            confirmNewPassword
        })
    })
    .then(response => response.json())
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err);
        return {
            success: false
        }
    })
}

export const updatePassword = (token, sessionId, passwordBody) => {
    
    return fetch(`${API}/update/password/${sessionId}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(passwordBody)
    })
    .then(response => response.json())
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err);
        return {
            success: false
        }
    })
}

export const updateEmail = (token, sessionId, updateEmailBody) => {

    return fetch(`${API}/updateSignupEmail/${sessionId}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateEmailBody)
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err);
        return {success: false}
    })
}

export const updateMobileNumber = (token, sessionId, updateMobileNumberBody) => {

    return fetch(`${API}/updateSignupMobile/${sessionId}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateMobileNumberBody)
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err);
        return {success: false}
    })
}

export const addToWaitingList = (user) => {

    return fetch(`${API}/addToWaitingList`, {
        method: "POST",
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(async res => {
        const  response = await res.json();
        // console.log(response)
        return response
    })
    .catch(err => {
        console.log(err)
    })
}

export const isPlanValid = (token, sessionId) => {

    return {
        success: true,
        message: 'default message'
    }

    return fetch(`${API}/isPlanValid/${sessionId}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: 'something went wrong!'
        }
    })
}