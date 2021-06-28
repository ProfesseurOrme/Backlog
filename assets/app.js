import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "./src/i18n/i18n"
import "./src/styles/app.scss"
import {BrowserRouter as Router} from "react-router-dom";
import App from "./src/components/App";


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);