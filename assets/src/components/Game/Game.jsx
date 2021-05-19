import React from "react";
import background from "../../img/background.svg";
import Dashboard from "./Dashboard";
import SearchGame from "./SearchGame";
import DataService from "../../helpers/DataService";
import {getGamesPerUsers} from "../../api/ApiGames";

const Game = ({user}) => {
    const [openTab, setOpenTab] = React.useState(1);
    const [userGames, setUserGames] = React.useState(null);
    const [error, setError] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            getGames(DataService.API_URL, DataService.tokenHeader(user.token))

        }
    }, [])

    const getGames = (domain, header) => {
        getGamesPerUsers(domain, header).then(result => {
            setUserGames(result.data);
            setLoaded(true);
        })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div className="absolute top-0 w-full h-full bg-center bg-cover"
                     style={{backgroundImage: `url(${background})`}}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black">
                    </span>
                </div>
                <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-10/12 px-4 ml-auto mr-auto text-center">
                            <h1 className="text-white">Votre profil</h1>
                            <ul className="dashboard__list flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist">
                                <li className="-mb-px mr-4 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
                                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                            (openTab === 1
                                                ? "text-white bg-indigo-900"
                                                : "text-indigo-900 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        <i className="text-base mr-1 fas fa-book-open">
                                        </i> Dashboard
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 2
                                            ? "text-white bg-indigo-900"
                                            : "text-indigo-900 bg-white")
                                    }
                                       onClick={e => {
                                           e.preventDefault();
                                           setOpenTab(2);
                                       }}
                                       data-toggle="tab"
                                       href="#link2"
                                       role="tablist"
                                    >
                                        <i className="fas fa-search text-base mr-1">
                                        </i> Search
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{transform: "translateZ(0)"}}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                         preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100">
                        </polygon>
                    </svg>
                </div>
            </div>
            {
                loaded ?
                    <section className="pb-20 bg-blueGray-200 -mt-24">
                        <div className="container mx-auto">
                            <Dashboard
                                openTab={openTab}
                                className={openTab === 1 ? "block" : "hidden"}
                                id="link1" user={user}
                                userGames={userGames ? userGames : null}/>
                            <SearchGame
                                openTab={openTab}
                                className={openTab === 2 ? "block" : "hidden"}
                                id="link2"
                                user={user}
                                userGames={userGames ? userGames : null}/>
                        </div>
                    </section>
                    :
                    <></>
            }
        </>
    )
}

export default Game;