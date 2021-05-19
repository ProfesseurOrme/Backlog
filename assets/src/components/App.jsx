import * as React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Login from "./Authentication/Login";
import Footer from "./Footer";
import AuthService from "../helpers/AuthService";
import DataService  from "../helpers/DataService";
import Register from "./Authentication/Register";
import Game from "./Game/Game";

const App = () => {

    const [user, setUser] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
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
            <Navbar user={user} logout={logout} />
            <Switch>
                <Route path="/" exact render={() => <Home user={user} />} />
                <AuthenticatedRoutes path="/games" render={() => <Game user={user}/>} />
                <AuthenticatedRoutes path="/logout" />
                <NotAuthenticatedRoutes path="/register" component={Register} />
                <NotAuthenticatedRoutes path="/login" render={() => <Login setUser={setUser}/>} />

                <Route render={() => <Redirect to="/" />} />
            </Switch>
            <Footer />
        </>
    )
}

export default App;