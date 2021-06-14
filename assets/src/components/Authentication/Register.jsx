import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";
import DataService from "../../helpers/DataService";
import background from "../../img/background.svg";
import {getUser} from "../../api/ApiUser";

const Register = () => {

    const [form, setForm] = useState({
        fields: {
            username: "",
            email: "",
            name: "",
            lastname: "",
            password : ""
        },
        errors: {
            username: "",
            email: "",
            name: "",
            lastname: "",
            password : ""
        }
    });

    let history = useHistory();

    const testEmail = {
        regex : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        error : "Your email is not in the correct format"
    };

    const testPassword = {
        regex : /^[0-9a-zA-Z]{8,}$/,
        error: "Your password must contain at least 8 digits or letters"
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        AuthService.register(DataService.API_URL, form.fields)
            .then(result => {
                history.push("/");
            })
        ;
    }

    const updateFormState = (field, value, error) => {
        setForm(prevData => ({
            fields : {
                ...prevData.fields,
                [field]: value
            },
            errors: {
                ...prevData.errors,
                [field]: error
            }
        }));
    }

    const handleUsername = async(field, value) => {
        const searchUsername = await getUser(DataService.API_URL, {username : value})
            .then(_ => {
               return ""
            })
            .catch(error=> {
                return error.response.data.message
            })
        updateFormState(field, value, searchUsername);
    }

    const handleField = (field, value, test) => {
        updateFormState(field, value, (!test.regex.test(value) ? test.error : ""));
    }

    const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case "username" : handleUsername(name, value);
            break;
            case "email" : handleField(name, value, testEmail);
            break;
            case "password": handleField(name, value, testPassword);
            break;
        }
        setForm(prevData => ({
            ...prevData
            , fields: {
                ...prevData.fields,
                [name]: value
            }
        }));
    };

    return (
        // { error ? <AlertDefault message={error} variant={'danger'} /> : "" }
        <>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: `url(${background})`}}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black">
                    </span>
                </div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-6/12 px-4">
                            <div
                                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3"><h6
                                            className="text-blueGray-500 text-sm font-bold">Register</h6>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                   htmlFor="grid-password">Username</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="username"
                                                name="username"
                                                placeholder="Enter your username"
                                                value={form.fields.username}
                                                onChange={handleChange}
                                                required
                                            />

                                            { form.errors.username ?
                                                <>
                                                    <span className="form__error_icon z-10 h-full leading-snug font-normal absolute text-center text-red-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                                        <i className="fas fa-times">
                                                        </i>
                                                    </span>
                                                    <span className="py-1 text-xs text-red-500" id="passwordHelp">
                                                        {form.errors.username}
                                                    </span>
                                                </>: ""}
                                        </div>
                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                   htmlFor="grid-password">Email</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="email"
                                                name="email"
                                                placeholder="Enter an email"
                                                value={form.fields.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            { form.errors.email ?
                                                <>
                                                    <span className="form__error_icon z-10 h-full leading-snug font-normal absolute text-center text-red-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                                        <i className="fas fa-times">
                                                        </i>
                                                    </span>
                                                    <span className="py-1 text-xs text-red-500" id="passwordHelp">
                                                        {form.errors.email}
                                                    </span>
                                                </>: ""}
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                   htmlFor="grid-password">Name</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="text"
                                                name="name"
                                                placeholder="Enter your firstname"
                                                value={form.fields.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Lastname</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="text"
                                                name="lastname"
                                                placeholder="Enter your lastname"
                                                value={form.fields.lastname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="password"
                                                name="password"
                                                placeholder="Enter a password"
                                                value={form.fields.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            { form.errors.password ?
                                                <>
                                                    <span className="form__error_icon z-10 h-full leading-snug font-normal absolute text-center text-red-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                                        <i className="fas fa-times">
                                                        </i>
                                                    </span>
                                                    <span className="py-1 text-xs text-red-500" id="passwordHelp">
                                                        {form.errors.password}
                                                    </span>
                                                </>: ""}
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Register
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

export default Register;