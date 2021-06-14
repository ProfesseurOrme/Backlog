import React, {useState, useEffect} from "react";
import {Tab, Row, Col, Nav, Card} from "react-bootstrap";
import Dashboard from "./Dashboard";
import SearchGame from "./SearchGame";
import DataService from "../../helpers/DataService";
import {getGamesPerUsers} from "../../api/ApiGames";

const UserGame = ({user}) => {
    const [userGames, setUserGames] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loadGames, setLoadGames] = useState(false);

    useEffect(() => {
        if (user) {
            getGames(DataService.API_URL, DataService.tokenHeader(user.token))
            setLoadGames(false);
        }
    }, [loadGames])

    const getGames = (domain, header) => {
        getGamesPerUsers(domain, header)
            .then(result => {
            setUserGames(result.data);
            setLoaded(true);
            })
            .catch(error => {
                setError(error.message);
            })
        ;
    }

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Card className="my-3">
                            <Card.Header>
                                <Card.Title>Dashboard</Card.Title>
                                <Card.Title><strong>{user.data.user}</strong></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">My Games</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Search</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                    { loaded ?
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Dashboard
                                        id="link1" user={user}
                                        userGames={userGames ? userGames : null}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <SearchGame
                                        id="link2"
                                        user={user}
                                        userGames={userGames ? userGames : null}
                                        setLoadGames={setLoadGames}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                        :
                        <></>
                    }
                </Row>
            </Tab.Container>
        </>
    )
}

export default UserGame;