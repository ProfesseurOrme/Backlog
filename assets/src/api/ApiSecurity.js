import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const login = (data) => {
    console.log(data);
    return ApiService.post(urlBacklogApi() + "/api/login", data);
}

export const refreshToken = (data) => {
    return ApiService.post(urlBacklogApi() + "/api/token/refresh", data);
}

export const register = (data) => {
    return ApiService.post(urlBacklogApi() + "/api/users/register", data);
}