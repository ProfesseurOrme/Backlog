import axios from "axios";

export const setRating = (domain, header, data, uuid) => {
    return axios.post(domain + "/api/games/" + uuid + "/ratings/", data, {
        headers : header
    })
}

export const getRating = (domain, header, uuid) => {
    return axios.get(domain + "/api/games/" + uuid + "/ratings/" , {
        headers : header
    })
}

export const updateRating = (domain, header, data, uuid) => {
    return axios.put(domain + "/api/games/" + uuid + "/ratings/" + data.id, data,{
        headers : header
    })
}