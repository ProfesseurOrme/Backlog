import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavbarDefault = () => {
    return (
        <Nav variant="pills" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={Link} to="/game">Search Game</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavbarDefault;