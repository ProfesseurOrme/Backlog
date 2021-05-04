import axios from "axios";

export const login = async (domain,data) => {
    return await axios.post(domain + "/api/login", data)
        .then(res => {
            //complete the localStorage
        })
    ;
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = async (domain, data) => {
    return await axios.post(domain + "/api/register", data);
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}