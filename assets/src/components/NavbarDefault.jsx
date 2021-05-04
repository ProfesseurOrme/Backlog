import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavbarDefault = () => {
    return (
        <Navbar bg="dark" variant="pills" defaultactivekey="/">
            <Nav className="mr-auto">
                <Nav.Item>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  as={Link} to="/game">Search Game</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavbarDefault;