const API = process.env.REACT_APP_SERVER_API

export const getCounter = async () => {
    return fetch(`${API}/getCounter`, {
        method: "GET"
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {
            success: false
        } 
    })
}