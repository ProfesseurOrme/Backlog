import axios from "axios";

export const getUsers = async(domain,header) => {
    await axios.get(domain + "/api/games", {
        headers : header
    });
}