import {login, refreshToken, register} from "../api/ApiSecurity";

class AuthService {

    setExpirationDate = () => {
        let date = new Date();
        date.setHours(date.getHours() + 1);
        //date.setMinutes(date.getMinutes() + 1);
        return  date;
    }

    login = async (locale, data) => {
        return await login(locale, data)
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

    checkUser = async (locale, key) => {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) {
            throw null
        }

        const item = JSON.parse(itemStr)
        const pastDate = new Date(item.expired_token_date).getTime();
        const now = new Date();

        if (now.getTime() > pastDate) {
            return await refreshToken(locale, {"refresh_token": item.refresh_token})
                .then(result => {
                    const newItem = {
                        ...item,
                        token: result.data.token,
                        refresh_token: result.data.refresh_token,
                        expired_token_date: this.setExpirationDate()
                    };
                    localStorage.setItem(key, JSON.stringify(newItem));
                    return newItem;
                })
                .catch(_ => {
                    localStorage.removeItem(key);
                    throw null;
                });
        } else {
            return item;
        }
    }

    logout = () => {
        localStorage.removeItem("user");
    }

    register = async (locale, data) => {
        return await register(locale, data);
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();