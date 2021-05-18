import React from "react";
import axios from "axios";
import SearchGameList from "./SearchGameList";
import {getGames} from "../../../api/ApiRawg";

const SearchGame = ({openTab, user, userGames}) => {
    const [search, setSearch] = React.useState("");
    const [searchedGames, setSearchedGames] = React.useState([]);
    const [nbResults, setNbResults] = React.useState(0);
    const [next, setNext] = React.useState("");
    const [prev, setPrev] = React.useState("");
    const [error, setError] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        let slug = search.split(' ').join('-').toLowerCase();
        if(search.length > 3) {
            getGames(slug)
                .then(result => {
                    (result.data.next) ? setNext(result.data.next) : null;
                    setNbResults(result.data.count);
                    setSearchedGames(result.data.results);
                    setLoaded(true);
                })
                .catch(error => {
                    setError(error.message);
                })
            ;
        }
    }

    const handleLoadPage = (url) => {
        axios.get(url)
            .then(result => {
                (result.data.next) ? setNext(result.data.next) : null;
                (result.data.previous) ? setPrev(result.data.previous) : null;
                setSearchedGames(result.data.results);
            })
            .catch(error => {
                setError(error.message);
            })
        ;
    }

    return (
        <div className={"flex flex-wrap " + (openTab === 2 ? "block" : "hidden")} id="link2">
            <div className="w-full md:w-12/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words w-full">
                    <div className="px-3 py-4 flex-auto">
                        <div className="relative flex flex-col min-w-0 break-words w-full">
                            <form onSubmit={handleSearch}>
                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <input type="text" placeholder="SearchGameList your game" className="input__search px-4 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border border-white outline-none focus:outline-none w-full pr-10" onChange={(event) => setSearch(event.target.value)}/>
                                    <span className="z-10 h-full leading-normal font-normal absolute text-center text-purple-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-4 py-4">
                                        <i className="fas fa-search">
                                        </i>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            { searchedGames ?
                <>
                    <div className="flex flex-wrap block">
                        {searchedGames.map(game => (
                            game ? <SearchGameList key={game.id} game={game} userGames={userGames ? userGames : null} user={user} /> : ""
                        ))}
                    </div>

                    { (next || prev)  ?
                        <div className="w-full lg:w-12/12 px-4">
                            <div className="text-center mt-6">
                                {
                                    prev ?
                                        <button onClick={() => handleLoadPage(prev)}
                                                className="bg-purple-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button">
                                            <i className="fas fa-angle-left">
                                            </i>
                                            Prev
                                        </button> : ""
                                }
                                {
                                    next ?
                                        <button onClick={() => handleLoadPage(next)}
                                                className="bg-purple-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button">
                                            Next
                                            <i className="fas fa-angle-right">
                                            </i>
                                        </button> : ""
                                }
                            </div>
                        </div>
                        : "" }
                </>
                : "" }
        </div>
    )
}

export default SearchGame;