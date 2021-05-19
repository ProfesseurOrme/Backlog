import React from "react";
import {updateGameUserStatus} from "../../api/ApiGames";
import DataService from "../../helpers/DataService";

const SearchGameList = ({game, user, userGames}) => {

    const [userGame, setUserGame] = React.useState(null);
    const reformatDate = (date) => {
        if (date) {
            let dArr = date.split("-");
            return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
        } else {
            return "TBA";
        }
    }

    if (userGames) {
        React.useEffect(() => {
            let search = userGames.find(item => item.uuid === game.id.toString())
            search ? setUserGame(search) : ""
        }, [])
    }

    const changeStatus = (statusId, gameUuid, gameSlug) => {
        updateGameUserStatus(DataService.API_URL, DataService.tokenHeader(user.token), statusId, gameUuid, gameSlug)
            .then(result => {
            })
        ;
    }

    return (
        <div className="w-full sm:w-1/12 md:w-1/2 xl:w-6/12 p-4">
            <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="p-4">
                    {game.platforms ? game.platforms.map(item => (
                        <span key={item.platform.id}
                              className="inline-block mx-1 px-2 py-1 leading-none bg-indigo-500 text-blueGray-100 rounded-full font-semibold uppercase tracking-wide text-xs">{item.platform.name}</span>
                    )) : ""}
                    <h4 className="mt-2 mb-2 font-bold">{game.name}</h4>
                    <p className="text-sm"><strong>Release : </strong>{reformatDate(game.released)}</p>
                    <p className="text-sm"><strong>API Game uuid: </strong> {game.id}</p>
                </div>
                <div className="p-4 border-t border-b text-xs text-gray-700 text-center">
                    {
                        userGame ?
                            <>
                                <button className={(userGame.status === 1 ? "bg-emerald-500 text-white" +
                                    " active:bg-emerald-600 hover:bg-emerald-900" : "text-emerald-500 bg-transparent" +
                                    " border border-solid border-emerald-500 hover:bg-emerald-500 hover:text-white" +
                                    " active:bg-emerald-500") + " font-bold uppercase text-xs px-4 py-2 rounded-full" +
                                " outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                                        type="button">
                                    <i className="fas fa-check">
                                    </i> Done
                                </button>
                                <button className={(userGame.status === 2 ? "bg-orange-500 text-white" +
                                    " active:bg-orange-600 hover:bg-orange-900" : "text-orange-500 bg-transparent" +
                                    " border border-solid border-orange-500 hover:bg-orange-500 hover:text-white active:bg-orange-500") + " font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                                        type="button">
                                    <i className="fas fa-spinner">
                                    </i> In Progress
                                </button>
                                <button className={(userGame.status === 3 ? "bg-red-500 text-white active:bg-red-600" +
                                    " hover:bg-red-900" : "text-red-500 bg-transparent border border-solid" +
                                    " border-red-500 hover:bg-red-500 hover:text-white active:bg-red-500") + " font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                                        type="button">
                                    <i className="fas fa-tasks">
                                    </i> To Do
                                </button>
                            </>
                            :

                            <button
                                className="bg-indigo-500 hover:bg-indigo-900 text-white font-bold uppercase text-xs mx-1 px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button">
                                <i className="fas fa-plus-circle">
                                </i> Add to collection
                            </button>

                    }
                </div>
            </div>
        </div>
    )

}

export default SearchGameList;