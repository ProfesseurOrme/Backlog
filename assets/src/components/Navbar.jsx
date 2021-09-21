import * as React from "react";
import {ButtonGroup, Card, Col, Dropdown, DropdownButton, Nav, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {BiSearchAlt2} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import {GiFrance} from "react-icons/gi";
import {RiAdminFill, RiGamepadLine} from "react-icons/ri";
import {SiEventbrite} from "react-icons/si";
import {Link, useLocation} from "react-router-dom";

const Navbar = ({user, logout}) => {

    const [trans, i18n ] = useTranslation();
    const route = useLocation();

    return (
        <Row className={"d-flex"}>
            <Col sm={12} className={"p-0"}>
                <Card className="mb-3">
                    <Card.Header>
                        <Card.Title>{trans("main.title")}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Nav variant="pills" className="justify-content-around">
                            <Nav.Item>
                                <Link className={(route.pathname === "/") ?  "btn btn-nav btn-sm btn-primary" : ""} to={"/"}><RiGamepadLine /> {trans("main.tabs.my_games")}</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to={"/search-games"} className={(route.pathname === "/search-games") ?  "btn btn-nav btn-sm btn-primary" : ""}><BiSearchAlt2 /> {trans("main.tabs.search")}</Link>
                            </Nav.Item>
                            <DropdownButton as={ButtonGroup} title={trans("main.tabs.my_account.label")} id="bg-nested-dropdown">
                                <Dropdown.Header><strong>{user.data.user}</strong></Dropdown.Header>
                                <Dropdown.Divider />
                                {
                                    user.data.roles[0] === "ROLE_ADMIN" ?
                                        <>
                                            <Link to={"/backlog-admin"} className="dropdown-item-primary dropdown-item" ><RiAdminFill /> {trans("main.admin.title")}</Link>
                                        </>
                                        :
                                        ""
                                }
                                <Dropdown.Divider />
                                <Dropdown.Item className={"dropdown-item-primary"} onClick={() => {i18n.changeLanguage("fr")}}><GiFrance /> French</Dropdown.Item>
                                <Dropdown.Item className={"dropdown-item-warning"} onClick={() => {i18n.changeLanguage("en")}}><SiEventbrite /> English</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className={"dropdown-item-danger"} onClick={logout}><FiLogOut /> {trans("main.tabs.my_account.logout")}</Dropdown.Item>
                            </DropdownButton>
                        </Nav>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Navbar