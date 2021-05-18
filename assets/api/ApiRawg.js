import axios from "axios";
import {apiKey} from "./config";

export const getGames = (slug) => {
    return axios.get("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + slug +"&exclude_additions=true")
}