import {login, refreshToken, register} from "../api/ApiSecurity";

class AuthService {

    setExpirationDate = () => {
        let date = new Date();
        date.setHours(date.getHours() + 1);
        //date.setMinutes(date.getMinutes() + 1);
        return  date;
    }

    login = async (data) => {
        return await login(data)
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
            throw null
        }

        const item = JSON.parse(itemStr)
        const pastDate = new Date(item.expired_token_date).getTime();
        const now = new Date();

        if (now.getTime() > pastDate) {
            return await refreshToken({"refresh_token" : item.refresh_token})
                .then(result => {
                    console.log("Il est refresh");
                    const newItem = {
                        ...item,
                        token : result.data.token,
                        refresh_token: result.data.refresh_token,
                        expired_token_date : this.setExpirationDate()
                    };
                    localStorage.setItem(key, JSON.stringify(newItem));
                    return newItem;
                })
                .catch(_ => {
                    console.log("Il n'est plus valide");
                    localStorage.removeItem(key);
                    throw null;
                })
            ;
        } else {
            console.log("Il est encore valide");
            return item;
        }
    }

    logout = () => {
        localStorage.removeItem("user");
    }

    register = async (data) => {
        return await register(data);
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();