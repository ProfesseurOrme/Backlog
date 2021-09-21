import React, {useState, useEffect} from 'react';
import {Container, Dropdown, Jumbotron, Spinner, Tab} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {RiAdminFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import {getGamesPerUser, setGameWithUser, updateGameUserStatus} from "../api/ApiGames";
import {
    addGame,
    deleteGame,
    fetchGames,
    selectGame,
    selectMyGames
} from "../store/game";
import Admin from "./Admin/Admin";
import Login from "./Authentication/Login";
import DashboardGames from "./Dashboard/DashboardGames";
import Search from "./Dashboard/Search";
import Footer from "./Footer";
import AuthService from "../helpers/AuthService";
import Game from "./Game/Game";
import Navbar from "./Navbar";
import Register from "./Authentication/Register";

const App = () => {

    const isCancelled = React.useRef(false);
    const [userGames, setUserGames] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loadGames, setLoadGames] = useState(false);
    const [gameInfoUuid, setGameInfoUuid] = useState("");
    const [show, setShow] = useState(false);
    const [trans, i18n] = useTranslation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        AuthService.checkUser(i18n.language,"user")
            .then(result => {
                setUser(result);
            })
            .catch(_ => {
                setUser(null);
            })
            .finally(() => {
                setLoaded(true);
            })
        ;

    }, []);

    useEffect(() => {
        getGames();
        setLoadGames(false);
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



    const logout = () => {
        AuthService.logout();
        setUser(null);
    }

    const handleChangeStatus = (statusId, gameUuid) => {
        updateGameUserStatus(i18n.language, statusId, gameUuid)
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
            { loaded ?
                <>
                    {
                        user ?
                            <>
                                <Container fluid className="min-vh-100 d-flex h-100 flex-column">
                                    <Navbar user={user} logout={logout} />
                                    {
                                        gameInfoUuid ?
                                            <Game
                                                user={user}
                                                handleCloseModal={handleClose}
                                                gameInfoUuid={gameInfoUuid}
                                                setGameInfoUuid={setGameInfoUuid}
                                                userGame={findGame(userGames, gameInfoUuid)}
                                                showModal={show}
                                                handleChangeStatus={handleChangeStatus}
                                                handleAddGame={handleAddGame}
                                            />
                                            :
                                            ""
                                    }
                                    <Switch>
                                        {
                                            user.data.roles[0] === "ROLE_ADMIN" ?
                                                <Route path={"/backlog-admin"}>
                                                    <Admin user={user} />
                                                </Route>
                                                :
                                                ""
                                        }
                                        <Route path={"/search-games"}>
                                            <Search
                                                user={user}
                                                userGames={userGames ? userGames  : null}
                                                handleChangeStatus={handleChangeStatus}
                                                handleAddGame={handleAddGame}
                                                handleShowModal={handleShow}
                                                setGameInfoUuid={setGameInfoUuid}
                                            />
                                        </Route>
                                        <Route path="/">
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
                                                    <></>
                                            }
                                        </Route>
                                        <Route path="/logout" />
                                        <Route render={() => <Redirect to="/" />} />
                                    </Switch>
                                </Container>
                                <Footer />
                            </>
                            :
                            <>
                                <Container fluid className="min-vh-100">
                                    <Switch>
                                        <Route path="/register" component={Register} />
                                        <Route exact path="/login" render={() => <Login setUser={setUser}/>} />
                                        <Route render={() => <Redirect to="/login" />} />
                                    </Switch>
                                </Container>
                                <Footer />
                            </>
                    }
                </>
                :
                ""
            }
        </>
    )
}

export default App;