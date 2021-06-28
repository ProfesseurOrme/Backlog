import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";

export const getRating = (uuid) => {
    return ApiService.get(urlBacklogApi() + "/api/games/" + uuid + "/ratings/", true);
}

export const setRating = (data, uuid) => {
    return ApiService.post(urlBacklogApi() + "/api/games/" + uuid + "/ratings/" , data, true);
}

export const updateRating = (data, uuid) => {
    return ApiService.put(urlBacklogApi() + "/api/games/" + uuid + "/ratings/" + data.id, data, true);
}