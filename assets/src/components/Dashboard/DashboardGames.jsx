import React, {useState, useEffect} from "react";
import {Button, Card, Col, Form, InputGroup, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaSearch} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import DashBoardGamesTable from "./DashBoardGamesTable";
import PlatformSelectService from "../../helpers/PlatformSelectService";

const initialStateSort = {
    name : "",
    platform : "",
    nbResults: 0,
    games : [],
    option_select_platforms : [],
    loaded: false,
    search : false
}

const DashboardGames = ({userGames, handleShowModal, setGameInfoUuid}) => {

    const [state, setState] = useState({
        toDo: [],
        inProgress: [],
        finished: []
    })
    const [sort, setSort] = useState(initialStateSort);
    const [trans , i18n] = useTranslation();

    useEffect(() => {
        if(userGames) {
            setState({
                toDo: [],
                inProgress: [],
                finished: []
            })
            userGames.forEach((item) => {
                switch (item.status) {
                    case 1 : setState(prevState => ({...prevState, toDo : [...prevState.toDo, item]}))
                        break;
                    case 2 : setState(prevState => ({...prevState, inProgress : [...prevState.inProgress, item]}))
                        break;
                    case 3 : setState(prevState => ({...prevState, finished : [...prevState.finished, item]}))
                        break;
                }
            })
            setSort(prevState => ({...prevState, option_select_platforms: PlatformSelectService.platformSelector(userGames)}))
        }
    }, [userGames, sort.games]);

    const resetResults = _ => {
        setSort(prevState => ({...initialStateSort, option_select_platforms: [...prevState.option_select_platforms] }));
    }

    const handleSearchGame = (event) => {
        event.preventDefault();
        if(sort.name || sort.platform) {
            setSort(prevState => ({...prevState, loaded: false}));
            const results = PlatformSelectService.searchByNameAndPlatform(sort.name, sort.platform, userGames);
            setSort(prevState => ({...prevState, search:true, loaded: true, nbResults: results.nbResults, games: results.games}));
        }
    }

    return (
        <>
            <Row className="my-3 justify-content-center">
                <Col lg={10} md={12} sm={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSearchGame}>
                                <Form.Row>
                                    <Col md={5} sm={12} className={"my-1"}>
                                        <InputGroup>
                                            <Form.Control
                                                type={"text"}
                                                placeholder={trans("main.dashboard.games.searchbar.input")}
                                                onChange={event => setSort(prevState => ({
                                                    ...prevState,
                                                    name: event.target.value
                                                }))}
                                                value={sort.name}
                                            />
                                            {
                                                sort.search ?
                                                    <OverlayTrigger
                                                        placement={"bottom"}
                                                        overlay={<Tooltip id={"tooltip-bottom"}>
                                                            <strong>{trans("main.dashboard.games.searchbar.reset_label")}</strong>
                                                        </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className={"mx-1"}
                                                            id="button-addon"
                                                            onClick={() => resetResults()}
                                                        >
                                                            <ImCross/>
                                                        </Button>
                                                    </OverlayTrigger>
                                                    :
                                                    ""
                                            }
                                        </InputGroup>
                                    </Col>
                                    <Col md={5} sm={12} className={"my-1"}>
                                        <Form.Control
                                            as={"select"}
                                            className={"mr-sm-2"}
                                            id={"inlineFormCustomSelect"}
                                            custom
                                            value={sort.platform}
                                            onChange={event => setSort(prevState => ({
                                                ...prevState,
                                                platform: event.target.value
                                            }))}
                                        >
                                            <option value={""}>- {trans("main.dashboard.games.searchbar.sort")} -</option>
                                            {
                                                sort.option_select_platforms.map(item => (
                                                    <option key={item.uuid} value={item.name}>{item.name}</option>
                                                ))
                                            }

                                        </Form.Control>
                                    </Col>
                                    <Col md={2} sm={12} className="my-1 justify-content-sm-center">
                                        <Button type="submit"><FaSearch/> {trans("main.dashboard.games.searchbar.submit")}</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                sort.search ?
                    <Row>
                        <Col>
                            {
                                typeof sort.games !== 'undefined' ?
                                    <DashBoardGamesTable
                                        key={4}
                                        title={trans("main.dashboard.games.status.titles.results") + " : " + sort.nbResults}
                                        handleShowModal={handleShowModal}
                                        setGameInfoUuid={setGameInfoUuid}
                                        games={sort.games}
                                        sortLoaded={sort.loaded}
                                    />
                                    :
                                    <Row className="my-3">
                                        <Col>
                                            <h3>{trans("main.dashboard.games.searchbar.error")} !</h3>
                                        </Col>
                                    </Row>
                            }
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col>
                            {state.inProgress.length > 0 ?
                                <DashBoardGamesTable
                                    key={1}
                                    title={trans("main.dashboard.games.status.titles.in_progress")}
                                    handleShowModal={handleShowModal}
                                    setGameInfoUuid={setGameInfoUuid}
                                    games={(state.inProgress.length > 0) ? state.inProgress : undefined}
                                />
                                :
                                ""
                            }
                            {state.toDo.length > 0 ?
                                <DashBoardGamesTable
                                    key={2}
                                    title={trans("main.dashboard.games.status.titles.to_do")}
                                    handleShowModal={handleShowModal}
                                    setGameInfoUuid={setGameInfoUuid}
                                    games={(state.toDo.length > 0) ? state.toDo : undefined}
                                />
                                :
                                ""
                            }
                            {state.finished.length > 0 ?
                                <DashBoardGamesTable
                                    key={3}
                                    title={trans("main.dashboard.games.status.titles.finished")}
                                    handleShowModal={handleShowModal}
                                    setGameInfoUuid={setGameInfoUuid}
                                    games={(state.finished.length > 0) ? state.finished : undefined}
                                />
                                :
                                ""
                            }
                        </Col>
                    </Row>
            }
        </>
    )
}

export default DashboardGames;