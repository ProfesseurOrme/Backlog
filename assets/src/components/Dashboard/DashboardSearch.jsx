import React, {useState} from "react";
import axios from "axios";
import {Col, Row, Form, Button, InputGroup, Spinner, Tooltip, OverlayTrigger} from "react-bootstrap";
import {ImCross} from "react-icons/im";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {delay} from "../../helpers/DelayService";
import DashboardSearchResult from "./DashboardSearchResult";
import {getGames} from "../../api/ApiRawg";

const initialState  = {
    search : "",
    searchedGames : [],
    nbResults: 0,
    next : "",
    previous: "",
    error: "",
    loaded : true
}

const DashboardSearch = ({user, userGames, setLoadGames, handleChangeStatus, handleShowModal, setGameInfoUuid, handleAddGame}) => {

    const [searchState, setSearchState] = useState(initialState);

    const handleSearch = async(event) => {
        event.preventDefault();
        setSearchState(prevState => ({
            ...prevState,
            loaded: false
        }));

        let slug = searchState.search.split(' ').join('-').toLowerCase();

        if(slug.length > 3) {
            getGames(slug)
                .then(result => {
                    setSearchState(prevState => ({
                        ...prevState,
                        next: (result.data.next) ? setSearchState(prevState => ({...prevState, next: result.data.next})) : "",
                        nbResults : result.data.count,
                        searchedGames : result.data.results
                    }))
                    if(result.data.count === 0) {
                        setSearchState(prevState => ({
                            ...prevState,
                            error: "No results for your search. Try again !"
                        }))
                    } else {
                        setSearchState(prevState => ({
                            ...prevState,
                            error: ""
                        }))
                    }
                })
                .catch(error => {
                    //to do
                })
            ;
            await delay(1000);
            setSearchState(prevState => ({
                ...prevState,
                loaded: true
            }));
        }
    }

    const handleLoadPage = async(url) => {
        setSearchState(prevState => ({
            ...prevState,
            loaded: false
        }));
        axios.get(url)
            .then(result => {
                setSearchState(prevState => ({
                    ...prevState,
                    next: (result.data.next) ? result.data.next : "",
                    previous: (result.data.previous) ? result.data.previous : "",
                    searchedGames: result.data.results
                }))
            })
            .catch(error => {
                setSearchState(prevState => ({
                    ...prevState,
                    error: error.message
                }))
            })
        ;
        await delay(1000);
        setSearchState(prevState => ({
            ...prevState,
            loaded: true
        }));
    }

    const getResultResearch = _ => {
        if(searchState.nbResults > 1) {
            return "There are " + searchState.nbResults + " games that have been found";
        } else {
            return "There is 1 games that have been found";
        }
    }

    const resetResults = _ => {
        setSearchState(initialState);
    }

    return (
        <>
            <Row className="my-3">
                <Col>
                    <form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Search your game"
                                onChange={(event) => setSearchState(prevState => ({...prevState, search :event.target.value}))}
                            />
                            {
                                searchState.nbResults ?
                                    <OverlayTrigger
                                        placement={"bottom"}
                                        overlay={<Tooltip id={"tooltip-bottom"}>
                                            <strong>Reset search</strong>
                                        </Tooltip>
                                        }
                                    >
                                        <Button
                                            className={"mx-1"}
                                            id="button-addon"
                                            onClick={() => resetResults()}
                                        >
                                            <ImCross />
                                        </Button>
                                    </OverlayTrigger>
                                    :
                                    ""
                            }
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            {
                searchState.loaded ?
                    <>
                        {
                            searchState.nbResults ?
                                <Row className="my-3">
                                    <Col>
                                        <h3>{getResultResearch()}</h3>
                                    </Col>
                                </Row>
                                :
                                ""
                        }
                        {
                            searchState.error ?
                                <Row className="my-3">
                                    <Col>
                                        <h3>{searchState.error}</h3>
                                    </Col>
                                </Row>
                                :
                                ""
                        }
                        <Row className="g-4 justify-content-center" sm={1} md={2} lg={3}>
                            { searchState.searchedGames ?
                                <>
                                    {searchState.searchedGames.map(game => (
                                        game ? <DashboardSearchResult
                                                    handleChangeStatus={handleChangeStatus}
                                                    handleAddGame={handleAddGame}
                                                    setLoadGames={setLoadGames}
                                                    key={game.id}
                                                    game={game}
                                                    userGames={userGames ? userGames : null}
                                                    user={user}
                                                    handleShowModal={handleShowModal}
                                                    setGameInfoUuid={setGameInfoUuid}
                                                />
                                            :
                                                ""
                                    ))}

                                </>
                                : ""
                            }
                        </Row>
                        { searchState.searchedGames && (searchState.next || searchState.previous)  ?
                            <Row>
                                <Col md={12} className="text-center">
                                    { searchState.previous ?

                                        <Button className="mx-2" variant="primary" onClick={() => handleLoadPage(searchState.previous)} type="button">
                                            <FaAngleLeft /> Prev
                                        </Button>
                                        :
                                        ""
                                    }
                                    { searchState.next ?
                                        <Button className="mx-2" variant="primary" onClick={() => handleLoadPage(searchState.next)} type="button">
                                            Next <FaAngleRight />
                                        </Button>
                                        :
                                        ""
                                    }
                                </Col>
                            </Row>
                            : ""
                        }
                    </>
                    :
                    <Row>
                        <Col className={"text-center"}>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>
            }
        </>
    )
}

export default DashboardSearch;