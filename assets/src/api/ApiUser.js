import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const getUser = (locale, data) => {
    return ApiService.post(urlBacklogApi(locale) + "/api/users/check_user" ,data, false)
}

export const getUsers = (locale) => {
    return ApiService.get(urlBacklogApi(locale) + "/api/users/", true);
}

export const deleteUser = (locale, username) => {
    return ApiService.delete(urlBacklogApi(locale) + "/api/users/" + username , true);
}