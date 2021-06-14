import axios from "axios";
import {apiKey} from "../config/config";

export const getGames = (slug) => {
    return axios.get("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + slug +"&exclude_additions=true")
}

export const getGame = (uuid) => {
    return axios.get("https://api.rawg.io/api/games/" + uuid + "?key=" + apiKey)
}