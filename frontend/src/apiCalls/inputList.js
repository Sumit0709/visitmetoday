const API = process.env.REACT_APP_SERVER_API

export const getCountryAndCodeList = () => {
    return fetch(`${API}/getFrontendData`,{
        method: "GET"
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        console.log(err.message);
        return false
    })
}


export const getExtendedProfileList = () => {
    return fetch(`${API}/getExtendedProfileList`,{
        method: "GET"
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        console.log(err.message);
        return {
            success: false
        }
    })
}