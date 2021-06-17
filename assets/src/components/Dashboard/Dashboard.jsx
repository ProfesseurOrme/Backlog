import React, {useState, useEffect} from "react";
import {Tab, Row, Col, Nav, Card, DropdownButton, Dropdown, ButtonGroup, Toast} from "react-bootstrap";
import {BiSearchAlt2} from "react-icons/bi";
import {RiGamepadLine} from "react-icons/ri";
import {FiLogOut} from "react-icons/fi";
import Game from "../Game/Game";
import DashboardGames from "./DashboardGames";
import DashboardSearch from "./DashboardSearch";
import DataService from "../../helpers/DataService";
import {getGamesPerUsers} from "../../api/ApiGames";

const Dashboard = ({user, logout}) => {
    const isCancelled = React.useRef(false);
    const [userGames, setUserGames] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loadGames, setLoadGames] = useState(false);
    const [show, setShow] = useState(false);
    const [gameInfoUuid, setGameInfoUuid] = useState("");

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
                }
            })
            .catch(error => {
                setError(error.message);
            })
        ;
    }

    return (
        <>
            {
                gameInfoUuid ? <Game user={user} handleCloseModal={handleClose} gameInfoUuid={gameInfoUuid} setGameInfoUuid={setGameInfoUuid} showModal={show} /> : ""
            }
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
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

                        <Row className={"justify-content-md-center"}>
                            <Col lg={10} md={12} sm={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <DashboardGames
                                            id="link1" user={user}
                                            userGames={userGames ? userGames : null}
                                            handleShowModal={handleShow}
                                            setGameInfoUuid={setGameInfoUuid}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <DashboardSearch
                                            id="link2"
                                            user={user}
                                            userGames={userGames ? userGames : null}
                                            setLoadGames={setLoadGames}
                                        />
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="third">

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