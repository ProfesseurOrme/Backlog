import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const getUser = (data) => {
    return ApiService.post(urlBacklogApi() + "/api/users/check_user" ,data)
}