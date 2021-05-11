import React from "react";
import {NavLink} from "react-router-dom";

const NavbarDefault = ({user, logout}) => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 navbar-expand-lg bg-purple-900">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <NavLink to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
                                Backlog.io
                            </NavLink>
                            <button
                                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <i className="fas fa-bars">

                                </i>
                            </button>
                        </div>
                        <div
                            className={
                                "lg:flex flex-grow items-center" +
                                (menuOpen ? " flex" : " hidden")
                            }
                            id="example-navbar-info"
                        >
                            <ul className="navbar__items flex flex-col lg:flex-row list-none lg:ml-auto">
                                <li className="nav-item">
                                    <NavLink to="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                        <i className="fas fa-home text-lg leading-lg text-white opacity-75">
                                        </i>
                                        <span className="ml-2">Home</span>
                                    </NavLink>
                                </li>
                                {user ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/games" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <i className="fas fa-gamepad text-lg leading-lg text-white opacity-75">
                                                </i>
                                                <span className="ml-2">Games</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={logout} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <i className="fas fa-times text-lg leading-lg text-white opacity-75">
                                                </i>
                                                <span className="ml-2">Logout</span>
                                            </a>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <i className="far fa-edit text-lg leading-lg text-white opacity-75">
                                                </i>
                                                <span className="ml-2">Register</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <i className="fas fa-sign-in-alt text-lg leading-lg text-white opacity-75">
                                                </i>
                                                <span className="ml-2">Login</span>
                                            </NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavbarDefault;