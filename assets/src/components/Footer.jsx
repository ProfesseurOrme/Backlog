import React from "react";

const Footer = () => {
    return (
        <footer className="relative bg-blueGray-200 pt-8 pb-6">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">Create by Matthieu G.
                         - <a href="https://github.com/ProfesseurOrme/Backlog"
                              className="text-blueGray-500 hover:text-blueGray-800">Repository Github</a>.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;