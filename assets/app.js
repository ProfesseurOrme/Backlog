import "./src/styles/app.scss"
import {BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import App from "./src/components/App";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);

