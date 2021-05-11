import React from "react";
import axios from "axios";
import {apiKey} from "../../../api/config";
import GameList from "../GameList";

const Search = ({openTab}) => {
    const [search, setSearch] = React.useState("");
    const [games, setGames] = React.useState(null);
    const [nbResults, setNbResults] = React.useState(0);
    const [next, setNext] = React.useState("");
    const [prev, setPrev] = React.useState("");
    const [error, setError] = React.useState("");
    const [loaded, setLoaded] = React.useState();

    const handleSearch = (event) => {
        event.preventDefault();
        let slug = search.split(' ').join('-').toLowerCase();
        if(search.length > 3) {
            axios.get("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + slug +"&exclude_additions=true")
                .then(result => {
                    (result.data.next) ? setNext(result.data.next) : null;
                    setNbResults(result.data.count);
                    setGames(result.data.results);
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
                (result.data.next) ? setPrev(result.data.previous) : null;
                setGames(result.data.results);
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
                                    <input type="text" placeholder="Search your game" className="input__search px-4 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border border-white outline-none focus:outline-none w-full pr-10" onChange={(event) => setSearch(event.target.value)}/>
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
            { games ?
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-700">Results (There is {nbResults} matche(s)) : </h5>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <tbody>
                                {games.map(game => <GameList key={game.id} game={game} /> )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    { (next || prev )  ?
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
                        </div> : ""
                    }
                </div> : "" }
        </div>
    )
}

export default Search;