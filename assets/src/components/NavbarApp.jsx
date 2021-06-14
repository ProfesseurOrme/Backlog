import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

const NavbarApp = ({user, logout}) => {

    return (
        <>
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to="/">Backlog.io</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" >
                            Home
                        </Nav.Link>
                        { user ?
                            <>
                                <Nav.Link as={Link} to="/games">
                                    Games
                                </Nav.Link>
                            </>
                            :
                            <>
                            </>
                        }
                    </Nav>
                    <Nav className="justify-content-end">
                        { user ?
                            <>
                                <Nav.Link onClick={logout}>
                                    Logout
                                </Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavbarApp;