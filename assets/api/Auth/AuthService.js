import axios from "axios";
import {login, refreshToken, register} from "../ApiSecurity";

class AuthService {

    setExpirationDate = () => {
        let date = new Date();
        date.setHours(date.getHours() + 1);
        return  date;
    }

    login = async (domain,data) => {
        return await login(domain,data)
            .then(result => {
                data = {
                    ...result.data,
                    expired_token_date : this.setExpirationDate()
                };

                localStorage.setItem("user", JSON.stringify(data));

                return data;
            }).catch(error => {
                throw error.response.data.message;
            })
        ;
    }

    checkUser = async (domain, key) => {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) {
            return null
        }

        const item = JSON.parse(itemStr)

        const now = new Date()
        if (now.getTime() > item.expired_token_date) {
            await refreshToken(domain, item.refresh_token)
                .then(result => {
                    const newItem = {
                        ...item,
                        token : result.data.token,
                        refresh_token: result.data.refresh_token,
                        expired_token_date : this.setExpirationDate()
                    };
                    localStorage.setItem(key, JSON.stringify(newItem));
                    console.log("oui");
                    return newItem;
                })
                .catch(_ => {
                    localStorage.removeItem(key);
                    throw null;
                })
            ;
        }
        return item;
    }

    logout = () => {
        localStorage.removeItem("user");
    }

    register = async (domain, data) => {
        return await register(domain, data);
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();