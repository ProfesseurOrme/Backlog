import React, {useState, useEffect} from "react";
import {
    Tab,
    Row,
    Col,
    Nav,
    Card,
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Jumbotron,
    Button,
    InputGroup,
    Form
} from "react-bootstrap";
import {BiSearchAlt2} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import {RiGamepadLine} from "react-icons/ri";
import {FiLogOut} from "react-icons/fi";
import {platformSelector} from "../../helpers/PlatformSelectService";
import Account from "../Account/Account";
import Game from "../Game/Game";
import DashboardGames from "./DashboardGames";
import DashboardSearch from "./DashboardSearch";
import DataService from "../../helpers/DataService";
import {getGamesPerUsers, setGameWithUser, updateGameUserStatus} from "../../api/ApiGames";

const initialStateSort = {
    name : "",
    platform : "",
    search : false
}

const Dashboard = ({user, logout}) => {
    const isCancelled = React.useRef(false);
    const [userGames, setUserGames] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loadGames, setLoadGames] = useState(false);
    const [show, setShow] = useState(false);
    const [gameInfoUuid, setGameInfoUuid] = useState("");
    const [sort, setSort] = useState(initialStateSort);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        isCancelled.current = false;
        getGames(DataService.API_URL, DataService.tokenHeader(user.token))
        setLoadGames(false);
        return () => {
            isCancelled.current = true;
        };
    }, [loadGames])


    const getGames = (domain, header) => {
        getGamesPerUsers(domain, header)
            .then(result => {
                if (!isCancelled.current) {
                    setUserGames(result.data);
                    setLoaded(true);
                    console.log(platformSelector(result.data));
                }
            })
            .catch(error => {
                setError(error.message);
            })
        ;
    }

    const handleChangeStatus = (statusId, gameUuid, gameSlug) => {
        updateGameUserStatus(DataService.API_URL, DataService.tokenHeader(user.token), statusId, gameUuid, gameSlug)
            .then(_ => {
                setLoadGames(true);
            })
    }

    const handleAddGame = (data) => {
        setGameWithUser(DataService.API_URL, DataService.tokenHeader(user.token), data)
            .then(_ => {
                setLoadGames(true);
            })
    }

    const findGame = (games, uuid) => {
        const result = games.find(game => game.uuid === uuid)
        return result ? result : undefined
    }

    const handleSearchGame = (event) => {
        event.preventDefault();
        console.log(sort)
    }

    return (
        <>
            {
                gameInfoUuid ?
                    <Game
                        user={user}
                        handleCloseModal={handleClose}
                        game={findGame(userGames, gameInfoUuid)}
                        gameInfoUuid={gameInfoUuid}
                        setGameInfoUuid={setGameInfoUuid}
                        showModal={show}
                        handleChangeStatus={handleChangeStatus}
                        handleAddGame={handleAddGame}
                    />
                    :
                    ""
            }
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className={"d-flex"}>
                    <Col sm={12} className={"p-0"}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Card.Title>Backlog.io</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Nav variant="pills" className="justify-content-around">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"><RiGamepadLine /> My Games</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"><BiSearchAlt2 /> Search</Nav.Link>
                                    </Nav.Item>
                                    <DropdownButton as={ButtonGroup} title="My Account" id="bg-nested-dropdown">
                                        <Dropdown.Header><strong>{user.data.user}</strong></Dropdown.Header>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="third">My Profil</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className={"dropdown-item-danger"} onClick={logout}><FiLogOut /> Logout</Dropdown.Item>
                                    </DropdownButton>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                { loaded ?
                    <>
                        { typeof userGames !== 'undefined' && userGames.length > 0 ?
                            <Row className="my-3 justify-content-center">
                                <Col md={10}>
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
                                                            {/*
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
                                                        */}
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
                                                            <option value={""}>Choose...</option>
                                                            <option value={"1"}>One</option>
                                                            <option value={"2"}>Two</option>
                                                            <option value={"3"}>Three</option>
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
                            : ""
                        }
                        <Row className={"justify-content-md-center"}>
                            <Col lg={10} md={12} sm={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        {
                                            typeof userGames !== 'undefined' && userGames.length > 0 ?
                                                <DashboardGames
                                                    id="link1"
                                                    user={user}
                                                    userGames={userGames ? userGames : null}
                                                    handleShowModal={handleShow}
                                                    setGameInfoUuid={setGameInfoUuid}
                                                    handleChangeStatus={handleChangeStatus}
                                                />
                                                :
                                                <Jumbotron>
                                                    <h1>You haven't added a game to your catalog yet</h1>
                                                    <p>
                                                        Search through the app and add all your games !
                                                    </p>
                                                </Jumbotron>
                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <DashboardSearch
                                            handleChangeStatus={handleChangeStatus}
                                            handleAddGame={handleAddGame}
                                            id="link2"
                                            user={user}
                                            setLoadGames={setLoadGames}
                                            userGames={userGames ? userGames : null}
                                            handleShowModal={handleShow}
                                            setGameInfoUuid={setGameInfoUuid}
                                        />
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="third">
                                        <Account user={user}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </>
                    :
                    <></>
                }
            </Tab.Container>
        </>
    )
}

export default Dashboard;