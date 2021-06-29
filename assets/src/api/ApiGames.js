import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";


export const getGamesPerUser = (locale) => {
    return ApiService.get(urlBacklogApi(locale) + "/api/games/", true);
}

export const updateGameUserStatus = (locale,statusId, gameUuid, gameSlug) => {
    return ApiService.put(urlBacklogApi(locale) + "/api/games/" + gameUuid + "-" + gameSlug + "/status/" + statusId, {}, true);
}

export const setGameWithUser = (locale,data) => {
    return ApiService.post(urlBacklogApi(locale) + "/api/games/", data, true);
}

export const getGameStatistics = (locale,gameUuid) => {
    return ApiService.get(urlBacklogApi(locale) + "/api/games/" + gameUuid + "/statistics/", true);
}