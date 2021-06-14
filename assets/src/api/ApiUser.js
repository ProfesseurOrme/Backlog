import axios from "axios";

export const getUser = (domain, data) => {
    return axios.post(domain + "/api/users/check_user" ,data)
}