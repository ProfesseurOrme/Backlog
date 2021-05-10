import React from "react";
import {Accordion, Button, Card, Col} from "react-bootstrap";

const GameList = ({game}) => {

    return (

        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={game.id}>
                {game.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={game.id}>
                <Card.Body>
                    <strong>Released :</strong> {(game.released) ? game.released : "TBA" }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )

}

export default GameList;