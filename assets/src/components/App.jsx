import React, {useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import CardGame from "./CardGame/CardGame";
import NavbarApp from "./NavbarApp";
import Home from "./Home/Home";
import Login from "./Authentication/Login";
import Footer from "./Footer";
import AuthService from "../helpers/AuthService";
import DataService  from "../helpers/DataService";
import Register from "./Authentication/Register";
import UserGame from "./Game/UserGame";

const App = () => {

    const [user, setUser] = useState("");
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        AuthService.checkUser(DataService.API_URL,"user")
            .then(result => {
                setUser(result);
                setLoaded(true);
            })
            .catch(error => {
                setLoaded(true);
            })
        ;
    }, []);

    const logout = () => {
        AuthService.logout();
        setUser("");
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
                    <NavbarApp user={user} logout={logout} />
                    <Container fluid className="min-vh-100">
                        <Switch>
                            <Route path="/" exact render={() => <Home user={user} />} />
                            <Route path="/game/:uuid/:slug" component={CardGame} />
                            <AuthenticatedRoutes path="/games" render={() => <UserGame user={user}/>} />
                            <AuthenticatedRoutes path="/logout" />
                            <NotAuthenticatedRoutes path="/game/:uuid/:slug" render={() => <CardGame />} />
                            <NotAuthenticatedRoutes path="/register" component={Register} />
                            <NotAuthenticatedRoutes path="/login" render={() => <Login setUser={setUser}/>} />
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </Container>
                    <Footer />
                </>: ""
            }
        </>
    )
}

export default App;