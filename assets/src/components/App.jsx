import React, {useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from "./Authentication/Login";
import Footer from "./Footer";
import AuthService from "../helpers/AuthService";
import {urlBacklogApi} from "../helpers/UrlBacklogService";
import Register from "./Authentication/Register";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        AuthService.checkUser(urlBacklogApi(),"user")
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

    const logout = () => {
        AuthService.logout();
        setUser(null);
    }

    return (
        <>
            { loaded ?
                <>
                    {
                        user ?
                            <>
                                <Container fluid className="min-vh-100 d-flex h-100 flex-column">
                                    <Switch>
                                        <Route path="/" render={() => <Dashboard logout={logout} user={user}/>} />
                                        <Route path="/logout" />
                                        <Route />
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