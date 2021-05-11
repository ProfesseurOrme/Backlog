import React from "react";

const Dashboard = ({openTab}) => {
    return (
        <div className={"flex flex-wrap " + (openTab === 1 ? "block" : "hidden")} id="link1">
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                            <i className="fas fa-check">
                            </i>
                        </div>
                        <h5 className="text-xl">Games finished</h5>
                        <h6 className="text-xl">0</h6>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                            <i className="fas fa-spinner">
                            </i>
                        </div>
                        <h5 className="text-xl">In Progress</h5>
                        <h6 className="text-xl">0</h6>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                            <i className="fas fa-thumbtack">
                            </i>
                        </div>
                        <h5 className="text-xl">To do</h5>
                        <h6 className="text-xl">0</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;