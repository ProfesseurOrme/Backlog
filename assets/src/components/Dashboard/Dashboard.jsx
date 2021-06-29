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
    Jumbotron
} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {SiEventbrite} from "react-icons/si";
import {GiFrance} from "react-icons/gi";
import {BiSearchAlt2} from "react-icons/bi";
import {RiGamepadLine} from "react-icons/ri";
import {FiLogOut} from "react-icons/fi";
import Account from "../Account/Account";
import Admin from "../Admin/Admin";
import Game from "../Game/Game";
import DashboardGames from "./DashboardGames";
import DashboardSearch from "./DashboardSearch";
import {getGamesPerUser, setGameWithUser, updateGameUserStatus} from "../../api/ApiGames";

const Dashboard = ({user, logout}) => {
    const isCancelled = React.useRef(false);
    const [userGames, setUserGames] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loadGames, setLoadGames] = useState(false);
    const [show, setShow] = useState(false);
    const [gameInfoUuid, setGameInfoUuid] = useState("");
    const [trans, i18n ] = useTranslation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        isCancelled.current = false;
        getGames();
        setLoadGames(false);
        return () => {
            isCancelled.current = true;
        };
    }, [loadGames])


    const getGames = () => {
        getGamesPerUser(i18n.language)
            .then(result => {
                if (!isCancelled.current) {
                    setUserGames(result.data);
                    setLoaded(true);
                }
            })
            .catch(error => {
                setError(error.message);
            })
        ;
    }

    const handleChangeStatus = (statusId, gameUuid, gameSlug) => {
        updateGameUserStatus(i18n.language, statusId, gameUuid, gameSlug)
            .then(_ => {
                setLoadGames(true);
            })
    }

    const handleAddGame = (data) => {
        setGameWithUser(i18n.language, data)
            .then(_ => {
                setLoadGames(true);
            })
    }

    const findGame = (games, uuid) => {
        const result = games.find(game => game.uuid === uuid)
        return result ? result : undefined
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
                                <Card.Title>{trans("main.title")}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Nav variant="pills" className="justify-content-around">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"><RiGamepadLine /> {trans("main.tabs.my_games")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"><BiSearchAlt2 /> {trans("main.tabs.search")}</Nav.Link>
                                    </Nav.Item>
                                    <DropdownButton as={ButtonGroup} title={trans("main.tabs.my_account.label")} id="bg-nested-dropdown">
                                        <Dropdown.Header><strong>{user.data.user}</strong></Dropdown.Header>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="third">{trans("main.tabs.my_account.profil")}</Dropdown.Item>
                                        {
                                            user.data.roles[0] === "ROLE_ADMIN" ?
                                                <>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="fourth">{trans("main.admin.title")}</Dropdown.Item>
                                                </>
                                                :
                                                ""
                                        }

                                        <Dropdown.Divider />
                                        <Dropdown.Item className={"dropdown-item-primary"} onClick={() => {i18n.changeLanguage("fr")}}><GiFrance /> French</Dropdown.Item>
                                        <Dropdown.Item className={"dropdown-item-warning"} onClick={() => {i18n.changeLanguage("en")}}><SiEventbrite /> English</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className={"dropdown-item-danger"} onClick={logout}><FiLogOut /> {trans("main.tabs.my_account.logout")}</Dropdown.Item>
                                    </DropdownButton>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                { loaded ?
                    <>
                        <Row className={"justify-content-md-center"}>
                            <Col>
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
                                                    <h1>{trans("main.dashboard.missing_title")}</h1>
                                                    <p>
                                                        {trans("main.dashboard.missing_text")}
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
                                {
                                    user.data.roles[0] === "ROLE_ADMIN" ?
                                        <Tab.Pane eventKey="fourth">
                                            <Admin user={user} />
                                        </Tab.Pane>
                                        :
                                        ""
                                }
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