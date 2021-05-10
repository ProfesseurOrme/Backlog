import * as React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import NavbarDefault from "./Assets/NavbarDefault";
import Home from "./Home/Home";
import Game from "./Game/Game";
import Login from "./Authentication/Login";
import FooterDefault from "./Assets/FooterDefault";
import AuthService from "../api/Auth/AuthService";
import DataService  from "../api/Auth/DataService";
import Register from "./Authentication/Register";

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
    }, [loaded]);

    const logout = () => {
        AuthService.logout();
        setUser("");
    }

    const NotAuthenticatedRoutes = (props) => {
        return (!user) ? <Route {...props} /> : <Redirect to="/" /> ;
    }
    const AuthenticatedRoutes = (props) => {
        return (user) ? <Route {...props} /> : <Redirect to="/"/>;
    }

    return (
        <>
            <NavbarDefault user={user} logout={logout} />
            <Switch>
                <Route path="/" exact render={() => <Home user={user} />} />
                <Route path="/game" component={Game} />
                <NotAuthenticatedRoutes path="/register" component={Register} />
                <NotAuthenticatedRoutes path="/login" render={() => <Login setUser={setUser}/>} />
                <AuthenticatedRoutes path="/logout" />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            <FooterDefault />
        </>
    )
}

export default App;