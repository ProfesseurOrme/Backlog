import ApiService from "../helpers/ApiService";
import {urlRAWGApi} from "../helpers/UrlBacklogService";

export const getGames = (slug) => {
    return ApiService.get(urlRAWGApi() + "/api/games?key=" + process.env.RAWG_API_KEY + "&search=" + slug + "&exclude_additions=true", false);
}

export const getGame = (uuid) => {
    return ApiService.get(urlRAWGApi() + "/api/games/" + uuid + "?key=" + process.env.RAWG_API_KEY, false);
}