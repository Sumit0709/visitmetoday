const API = process.env.REACT_APP_SERVER_API

export const getPaymentDetails = (token, sessionId) => {

    return fetch(`${API}/getPaymentDetails/${sessionId}`,{
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        return response;
    })
    .catch(err => {
        return {
            success: false,
            error: 'something went wrong!'
        }
    })

}

export const getPaymentQR = (token, sessionId) => {
    return fetch(`${API}/getPaymentQR/${sessionId}`,{
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        if(response.ok){
            return response.blob();
        }else{
            return response.json();
        }
    })
    .catch(err => {
        return {
            success: false,
            error: 'something went wrong'
        };
    })
}

export const paymentDone = (token, sessionId, UTRNumber) => {

    return fetch(`${API}/paymentDone/${sessionId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({UTRNumber: UTRNumber})
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    .catch(err => {
        return {
            success: false,
            error: 'Something went wrong!'
        }
    })
}