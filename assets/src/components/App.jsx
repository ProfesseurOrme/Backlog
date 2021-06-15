import React, {useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import Game from "./Game/Game";
import Login from "./Authentication/Login";
import Footer from "./Footer";
import AuthService from "../helpers/AuthService";
import DataService  from "../helpers/DataService";
import Register from "./Authentication/Register";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();

    useEffect(() => {

        AuthService.checkUser(DataService.API_URL,"user")
            .then(result => {
                setUser(result);
            })
            .catch(error => {
                setUser(null);
            })
            .finally(() => {
                setLoaded(true);
            })
        ;

    }, []);

    const logout = () => {
        AuthService.logout();
        setUser(null);
    }

    const NotAuthenticatedRoutes = (props) => {
        return (!user) ? <Route {...props} /> : <Redirect to="/" /> ;
    }
    const AuthenticatedRoutes = (props) => {
        return (user) ? <Route {...props} user={user} /> : <Redirect to="/"/>;
    }

    return (
        <>
            { loaded ?
                <>
                    {
                        user ?
                            <>
                                <Container fluid className="min-vh-100 h-100">
                                    <Switch>
                                        <AuthenticatedRoutes path="/game/:uuid/:slug" component={Game} />
                                        <AuthenticatedRoutes path="/" render={() => <Dashboard logout={logout} user={user}/>} />
                                        <AuthenticatedRoutes path="/logout" />
                                        <AuthenticatedRoutes path="/game/:uuid/:slug" render={() => <Game />} />
                                        <Route render={() => <Redirect to="/" />} />
                                    </Switch>
                                </Container>
                                <Footer />
                            </>
                            :
                            <Container fluid className="min-vh-100">
                                <Switch>
                                    <NotAuthenticatedRoutes path="/register" component={Register} />
                                    <NotAuthenticatedRoutes exact path="/login" render={() => <Login setUser={setUser}/>} />
                                    <Route render={() => <Redirect to="/login" />} />
                                </Switch>
                            </Container>
                    }
                </>
                :
                ""
            }
        </>
    )
}

export default App;