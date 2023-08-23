const API = process.env.REACT_APP_SERVER_API

export const createProfile = (token, sessionId, formData) => {

    return fetch(`${API}/createProfile/${sessionId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
    })
    .then(async (res) => {
        const response = await res.json();
        // console.log(response)
        return response;
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const createProfessionalProfile = (token, sessionId, formData) => {

    return fetch(`${API}/createProfessionalProfile/${sessionId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
    })
    .then(async (res) => {
        const response = await res.json();
        // console.log(response)
        return response;
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getProfile = (token,sessionId) => {

    return fetch(`${API}/getProfile/${sessionId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        credentials: 'include'
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getViewAnalysis = (token,sessionId) => {

    return fetch(`${API}/getViewAnalysis/${sessionId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        credentials: 'include'
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getProfessionalProfile = (token,sessionId) => {

    return fetch(`${API}/getProfessionalProfile/${sessionId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        credentials: 'include'
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const doesProfessionalProfileExist = (token, sessionId) => {
    return fetch(`${API}/doesProfessionalProfileExist/${sessionId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        credentials: 'include'
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const updateBasicProfile = (token, sessionId, basicProfileData) => {

    return fetch(`${API}/updateBasicProfile/${sessionId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(basicProfileData)
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updateBasicProfessionalProfile = (token, sessionId, basicProfileData) => {

    return fetch(`${API}/updateBasicProfessionalProfile/${sessionId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(basicProfileData)
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updateExtendedProfile = (token, sessionId, extendedProfileData) => {

    return fetch(`${API}/updateExtendedProfile/${sessionId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(extendedProfileData)
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updateExtendedProfessionalProfile = (token, sessionId, extendedProfileData) => {

    return fetch(`${API}/updateExtendedProfessionalProfile/${sessionId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(extendedProfileData)
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {success: false}
    })
}

export const updateProfilePhoto = (token, sessionId, formData) => {
    return fetch(`${API}/updateProfilePhoto/${sessionId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
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

export const updateProfessionaProfilePhoto = (token, sessionId, formData) => {
    return fetch(`${API}/updateProfessionalProfilePhoto/${sessionId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
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

export const getProfileUrl = (sessionId) => {
    return fetch(`${API}/getProfileUrl/${sessionId}`, {
        method: "GET",
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
        }
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            // console.log(response)
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getProfessionalProfileUrl = (sessionId) => {
    return fetch(`${API}/getProfessionalProfileUrl/${sessionId}`, {
        method: "GET",
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
        }
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            // console.log(response)
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getProfileFromUrl = (profileUrl) => {
    return fetch(`${API}/getProfileFromUrl/${profileUrl}`, {
        method: "GET",
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
        }
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const getProfessionalProfileFromUrl = (profileUrl) => {
    return fetch(`${API}/getProfessionalProfileFromUrl/${profileUrl}`, {
        method: "GET",
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
        }
    })
    .then(async data => {
        if(data){
            const response = await data.json();
            return response;
        }
        else{
            return {success: false}
        }
    })
    .catch(err => {
        return {
            success: false
        }
    })
}

export const updateCustomProfileUrl = (token, sessionId, customUrl) => {
    // console.log(JSON.stringify(customUrl));
    return fetch(`${API}/updateCustomProfileUrl/${sessionId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(customUrl)
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

export const updateCustomProfessionalProfileUrl = (token, sessionId, customUrl) => {
    // console.log(JSON.stringify(customUrl));
    return fetch(`${API}/updateCustomProfessionalProfileUrl/${sessionId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(customUrl)
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

export const getCard = (profileUrl) => {
    return fetch(`${API}/getCard/${profileUrl}`,{
        method: 'GET'
    })
    .then(response => {
        if(response.ok){
            return response.blob();
        }else{
            return false;
        }
    })
    .then(blob => {
        if(blob){
            const objectURL = URL.createObjectURL(blob);
            return objectURL;
        }else{
            return null;
        }
    })
}

export const getCardFromSessionId = (sessionId) => {
    return fetch(`${API}/getCard/session/${sessionId}`,{
        method: 'GET'
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

export const getProfessionalCardFromSessionId = (sessionId) => {
    return fetch(`${API}/getCard/session/b/${sessionId}`,{
        method: 'GET'
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

export const getCardFromUrl = (profileUrl) => {
    return fetch(`${API}/getCard/${profileUrl}`,{
        method: 'GET'
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

export const getProfessionalCardFromUrl = (profileUrl) => {
    return fetch(`${API}/getProfessionalCard/${profileUrl}`,{
        method: 'GET'
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

export const createCard = (token, sessionId) => {
    return fetch(`${API}/createCard/${sessionId}`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const createProfessionalCard = (token, sessionId) => {
    return fetch(`${API}/createProfessionalCard/${sessionId}`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const updateCard = (token, sessionId) => {
    return fetch(`${API}/updateCard/${sessionId}`, {
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(async res => {
        const response = await res.json();
        return response;
    })
    .catch(err => {
        return {
            success: false,
            error: err.message
        }
    })
}

export const getReferalAndVisitCounter = (token, sessionId) => {
    return fetch(`${API}/getReferalAndVisitCounter/${sessionId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => {
        // console.log(err)
        return {
            success: false, 
            error: "something went wrong"
        }
    })
}

export const getProfessionalReferalAndVisitCounter = (token, sessionId) => {
    return fetch(`${API}/getProfessionalReferalAndVisitCounter/${sessionId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => {
        // console.log(err)
        return {
            success: false, 
            error: "something went wrong"
        }
    })
}