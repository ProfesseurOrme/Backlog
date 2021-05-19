import React from "react";
import {useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";
import DataService from "../../helpers/DataService";
import background from "../../img/background.svg";

const Login = ({setUser}) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username : username,
            password : password
        }

        const loginResult = AuthService.login(DataService.API_URL, data)
            .then(result => {
                setUser(result);
                history.push("/");
            }).catch(error => {
                //To Do
            })
        ;

    }

    return (
        // { error ? <AlertDefault message={error} variant={'danger'} /> : "" }
        <>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-100">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black">
                    </span>
                </div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3"><h6
                                            className="text-blueGray-500 text-sm font-bold">Sign in with</h6>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Username</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="username"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)} />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit">Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;