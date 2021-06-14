import React, {useState} from "react";
import axios from "axios";
import {Col, Row, Form, Button} from "react-bootstrap";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import SearchGameList from "./SearchGameList";
import {getGames} from "../../api/ApiRawg";

const SearchGame = ({user, userGames, setLoadGames}) => {
    const [search, setSearch] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);
    const [nbResults, setNbResults] = useState(0);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

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
                    if(result.data.count === 0) {
                        setError("No results for your search. Try again !")
                    } else {
                        setError("");
                    }
                })
                .catch(error => {
                    //to do
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

    const getResultResearch = _ => {
        if(nbResults > 1) {
            return "There are " + nbResults + " games that have been found";
        } else {
            return "There is 1 games that have been found";
        }
    }

    return (
        <>
            <Row className="my-3">
                <Col>
                    <form onSubmit={handleSearch}>
                        <Form.Control size="lg" type="text" placeholder="Search your game" onChange={(event) => setSearch(event.target.value)} />
                    </form>
                </Col>
            </Row>
            {
                nbResults ?
                    <Row className="my-3">
                        <Col>
                            <h3>{getResultResearch()}</h3>
                        </Col>
                    </Row>
                    :
                    ""
            }
            {
                error ?
                    <Row className="my-3">
                        <Col>
                            <h3>{error}</h3>
                        </Col>
                    </Row>
                    :
                    ""
            }
            <Row className="g-4" sm={1} md={2} lg={3}>
                { searchedGames ?
                    <>
                        {searchedGames.map(game => (
                            game ? <SearchGameList key={game.id} game={game} setLoadGames={setLoadGames} userGames={userGames ? userGames : null} user={user} /> : ""
                        ))}

                    </>
                    : ""
                }
            </Row>
            { searchedGames && (next || prev)  ?
                <Row>
                    <Col md={12} className="text-center">
                        { prev ?

                            <Button className="mx-2" variant="primary" onClick={() => handleLoadPage(prev)} type="button">
                                <FaAngleLeft /> Prev
                            </Button>
                            :
                            ""
                        }
                        { next ?
                            <Button className="mx-2" variant="primary" onClick={() => handleLoadPage(next)} type="button">
                                Next <FaAngleRight />
                            </Button>
                            :
                            ""
                        }
                    </Col>
                </Row>
                : "" }
        </>
    )
}

export default SearchGame;