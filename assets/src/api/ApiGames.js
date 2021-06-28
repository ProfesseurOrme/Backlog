import ApiService from "../helpers/ApiService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";


export const getGamesPerUser = () => {
    return ApiService.get(urlBacklogApi() + "/api/games/", true);
}

export const updateGameUserStatus = (statusId, gameUuid, gameSlug) => {
    return ApiService.put(urlBacklogApi() + "/api/games/" + gameUuid + "-" + gameSlug + "/status/" + statusId, {}, true);
}

export const setGameWithUser = (data) => {
    return ApiService.post(urlBacklogApi() + "/api/games/", data, true);
}

export const getGameStatistics = (gameUuid) => {
    return ApiService.get(urlBacklogApi() + "/api/games/" + gameUuid + "/statistics/", true);
}