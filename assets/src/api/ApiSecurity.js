import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const login = (locale, data) => {
    return ApiService.post(urlBacklogApi(locale) + "/api/login", data);
}

export const refreshToken = (locale, data) => {
    return ApiService.post(urlBacklogApi(false) + "/api/token/refresh", data);
}

export const register = (locale, data) => {
    return ApiService.post(urlBacklogApi(locale) + "/api/users/register", data);
}