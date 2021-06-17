import axios from "axios";

export const setRating = (domain, header, data, uuid) => {
    return axios.post(domain + "/api/games/" + uuid + "/reviews/", data, {
        headers : header
    })
}

export const getRating = (domain, header, uuid) => {
    return axios.get(domain + "/api/games/" + uuid + "/reviews/" , {
        headers : header
    })
}

export const updateRating = (domain, header, data, uuid) => {
    return axios.put(domain + "/api/games/" + uuid + "/reviews/" , {
        headers : header
    })
}