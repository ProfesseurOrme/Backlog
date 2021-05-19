import React from "react";

const Dashboard = ({openTab, userGames}) => {

    const [toDo, setToDo] = React.useState([]);
    const [inProgress, setInProgress] = React.useState([]);
    const [finished, setFinished] = React.useState([]);

    React.useEffect(() => {
        if(userGames) {
            userGames.forEach((item) => {
                switch (item.status) {
                    case 1 : setToDo(currentArray => [...currentArray, item])
                    break;
                    case 2 : setInProgress(currentArray => [...currentArray, item])
                    break;
                    case 3 : setFinished(currentArray => [...currentArray, item])
                    break;
                }
            })
        }
    }, []);



    return (
        <div className={"flex flex-wrap " + (openTab === 1 ? "block" : "hidden")} id="link1">
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                            <i className="fas fa-thumbtack">
                            </i>
                        </div>
                        <h5 className="text-xl">To do</h5>

                        <h6 className="text-xl">{toDo ? toDo.length : 0}</h6>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                            <i className="fas fa-spinner">
                            </i>
                        </div>
                        <h5 className="text-xl">In Progress</h5>
                        <h6 className="text-xl">{inProgress ? inProgress.length : 0}</h6>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                            <i className="fas fa-check">
                            </i>
                        </div>
                        <h5 className="text-xl">Games finished</h5>
                        <h6 className="text-xl">{finished ? finished.length : 0}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;