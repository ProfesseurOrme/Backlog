import axios from "axios";
import AuthService from "./AuthService";
import {urlBacklogApi} from "./UrlBacklogService";

class ApiService {
    constructor() {
        this.url = urlBacklogApi();
    }

    async config() {
        return {
            headers : {
                Authorization: "Bearer " + await AuthService.checkUser(this.url, "user").then(res => {return res.token})
            }
        }
    }

    async get(url, headers){
        return axios.get(url, headers ? await this.config() : {})
    }

    async post(url, data, headers){
        return axios.post(url, data, headers ? await this.config() : {})
    }

    async put(url, data, headers) {
        return axios.post(url, data, headers ? await this.config() : {})
    }

    async delete(url, headers){
        return axios.delete(url, headers ? await this.config() : {})
    }
}
export default new ApiService();