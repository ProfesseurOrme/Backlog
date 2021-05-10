import axios from "axios";

export const login = (domain,data) => {
    return axios.post(domain + "/api/login", data)
}

export const refreshToken = (domain, data) => {
    return axios.post(domain + "/api/token/refresh", data)
}

export const register = (domain, data) => {
    return axios.post(domain + "/api/users/register", data);
}