import axios from "axios";

const getUsers= async() => {
    await axios.get("https://127.0.0.1:8000/api/games/")
        .then(result => {
            return result.data;
        })
    ;
}

export {getUsers};