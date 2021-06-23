import debounce from "@popperjs/core/lib/utils/debounce";
import React, {useState, useEffect} from "react";
import {Button, Card, Col, Form, InputGroup, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {delay} from "../../helpers/DelayService";
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
        setSort(prevState => ({...prevState, loaded: false}));
        const results = PlatformSelectService.searchByNameAndPlatform(sort.name, sort.platform, userGames);
        setSort(prevState => ({...prevState, search:true, loaded: true, nbResults: results.nbResults, games: results.games}));
    }

    return (
        <>
            <Row className="my-3 justify-content-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSearchGame}>
                                <Form.Row>
                                    <Col md={5} sm={12} className={"my-1"}>
                                        <InputGroup>
                                            <Form.Control
                                                type={"text"}
                                                placeholder={"Search your games"}
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
                                                            <strong>Reset search</strong>
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
                                            <option value={""}>- Choose your platform -</option>
                                            {
                                                sort.option_select_platforms.map(item => (
                                                    <option key={item.uuid} value={item.name}>{item.name}</option>
                                                ))
                                            }

                                        </Form.Control>
                                    </Col>
                                    <Col md={2} sm={12} className="my-1 justify-content-sm-center">
                                        <Button type="submit"><FaSearch/> Search</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                sort.search ?
                    <>
                        {
                            typeof sort.games !== 'undefined' ?
                            <DashBoardGamesTable
                                key={4}
                                title={"Search results  : " + sort.nbResults}
                                handleShowModal={handleShowModal}
                                setGameInfoUuid={setGameInfoUuid}
                                games={sort.games}
                                sortLoaded={sort.loaded}
                            />
                                :
                                "nada"
                        }
                    </>
                    :
                    <>
                        {state.inProgress.length > 0 ?
                            <DashBoardGamesTable
                                key={1}
                                title={"In Progress"}
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
                                title={"To Do"}
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
                                title={"Finished"}
                                handleShowModal={handleShowModal}
                                setGameInfoUuid={setGameInfoUuid}
                                games={(state.finished.length > 0) ? state.finished : undefined}
                            />
                            :
                            ""
                        }
                    </>
            }

        </>
    )
}

export default DashboardGames;