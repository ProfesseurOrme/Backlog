import React, {useState} from "react";
import axios from "axios";
import {Col, Row, Form, Button, InputGroup, Spinner, Tooltip, OverlayTrigger} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ImCross} from "react-icons/im";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {delay} from "../../helpers/DelayService";
import PlatformSelectService from "../../helpers/SearchService";
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

const DashboardSearch = ({user, userGames, handleChangeStatus, handleShowModal, setGameInfoUuid, handleAddGame}) => {

    const [searchState, setSearchState] = useState(initialState);
    const [trans, i18n] = useTranslation();

    const handleSearch = async(event) => {
        event.preventDefault();
        setSearchState(prevState => ({
            ...prevState,
            loaded: false
        }));

        let slug = PlatformSelectService.createSlug(searchState.search);

        if(slug.length > 3) {
            await getGames(slug)
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
                            error: trans("main.dashboard.games.searchbar.error")
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
            return trans("main.search.results", {nbGames : searchState.nbResults});
        } else {
            return trans("main.search.results", {nbGames : "1"})
        }
    }

    const resetResults = _ => {
        setSearchState(initialState);
    }

    return (
        <>
            <Row className="my-3 justify-content-center">
                <Col lg={10} md={12} sm={12}>
                    <form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder={trans("main.search.bar.input")}
                                onChange={(event) => setSearchState(prevState => ({...prevState, search :event.target.value}))}
                            />
                            {
                                searchState.nbResults ?
                                    <OverlayTrigger
                                        placement={"bottom"}
                                        overlay={<Tooltip id={"tooltip-bottom"}>
                                            <strong>{trans("main.search.bar.reset")}</strong>
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