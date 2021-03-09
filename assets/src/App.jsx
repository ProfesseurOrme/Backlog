import * as React from 'react';
import {Route, Switch,Redirect, Link} from 'react-router-dom';
import NavbarDefault from "./components/NavbarDefault";
import Home from "./Home/Home";
import Game from "./Game/Game";
import FooterDefault from "./components/FooterDefault";

const App = () => {
    const[ greetings, setGreetings ] = React.useState("Salut c'est un test");

    return (
        <>
            <NavbarDefault />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/game">
                    <Game />
                </Route>
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            <FooterDefault />
        </>
    )
}

export default App;