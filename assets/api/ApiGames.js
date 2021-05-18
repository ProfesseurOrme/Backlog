import axios from "axios";

export const getGamesPerUsers = (domain, header) => {
    return axios.get(domain + "/api/games" , {
        headers : header
    })
}

export const updateGameUserStatus= (domain, header, statusId, gameUuid, gameSlug) => {
    return axios.put(domain + "/api/games/" + gameUuid + "-" + gameSlug + "/status" + statusId, {}, {
        headers : header
    })
}