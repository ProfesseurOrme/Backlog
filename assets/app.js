import './styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import App from "./src/App";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);

