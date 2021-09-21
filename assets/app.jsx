import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import i18n from "./src/i18n/i18n"
import "./src/styles/app.scss"
import {BrowserRouter as Router} from "react-router-dom";
import App from "./src/components/App";
import store from "./src/store/store"


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
);