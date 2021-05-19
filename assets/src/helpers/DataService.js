class DataService {
    API_URL = "https://127.0.0.1:8000";

    tokenHeader = (token) => {
        return {
            Authorization: "Bearer " + token
        }
    }
}

export default new DataService();