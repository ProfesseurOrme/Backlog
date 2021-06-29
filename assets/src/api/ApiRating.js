import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const getRating = (locale,uuid) => {
    return ApiService.get(urlBacklogApi(locale) + "/api/games/" + uuid + "/ratings/", true);
}

export const setRating = (locale,data, uuid) => {
    return ApiService.post(urlBacklogApi(locale) + "/api/games/" + uuid + "/ratings/" , data, true);
}

export const updateRating = (locale,data, uuid) => {
    return ApiService.put(urlBacklogApi(locale) + "/api/games/" + uuid + "/ratings/" + data.id, data, true);
}