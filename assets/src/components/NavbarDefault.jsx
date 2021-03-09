import React from "react";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <Navbar className="navbar-horizontal navbar-dark bg-default">
            <Navbar.Brand href="/">Backlog</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/game">Games</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navbar;