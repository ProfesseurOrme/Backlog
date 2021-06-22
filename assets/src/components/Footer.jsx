import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col className={"text-center"}>
                    <p>Created by Matthieu G. - <a href={"https://github.com/ProfesseurOrme/Backlog"}>Repository Github</a>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;