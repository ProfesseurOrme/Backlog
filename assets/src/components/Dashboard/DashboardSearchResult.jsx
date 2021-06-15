import React, {useState, useEffect} from "react";
import {Button, ButtonGroup, Card, Col, ToggleButton} from "react-bootstrap";
import {FaCheck, FaPlusCircle, FaSpinner, FaTasks} from "react-icons/fa";
import placeholderImage from "../../img/placeholder-image.png";
import {reformatDate} from "../../helpers/MiscService";
import {setGameWithUser, updateGameUserStatus} from "../../api/ApiGames";
import DataService from "../../helpers/DataService";

const DashboardSearchResult = ({game, user, userGames, setLoadGames}) => {

    const [userGame, setUserGame] = useState(null);
    const [stateValue, setStateValue] = useState("");

    if (userGames) {
        useEffect(() => {
            let search = userGames.find(item => item.uuid === game.id.toString())
            if(search) {
                setStateValue(search.status.id);
                setUserGame(search)
            }
        }, [userGames])
    }

    const handleAddGames = (data) => {
        setGameWithUser(DataService.API_URL, DataService.tokenHeader(user.token), data)
            .then(_ => {
                setLoadGames(true);
            })
    }

    const handleChangeStatus = (statusId, gameUuid, gameSlug) => {
        updateGameUserStatus(DataService.API_URL, DataService.tokenHeader(user.token), statusId, gameUuid, gameSlug)
            .then(_ => {
                setLoadGames(true);
            })
    }

    return (
        <Col className="my-3">
            <Card>
                <Card.Img className="card-img-custom" variant="top"  src={game.background_image ? game.background_image : placeholderImage} />
                <Card.Body>
                    <Card.Title className="text-truncate">{game.name}</Card.Title>
                    <Card.Text><strong>Release : </strong>{reformatDate(game.released)}</Card.Text>
                    {/*
                        <Card.Text>
                            {game.platforms ? game.platforms.map(item => (
                                <Badge key={item.uuid} pill bg="primary" className="px-1">
                                    {item.name}
                                </Badge>
                            )) : ""}
                        </Card.Text>
                    */}
                </Card.Body>
                <Card.Footer className="text-center border-top-blue-grey border-top-lighten-5">
                    {
                        userGame ?
                            <>
                                <Button className={"mx-2"} disabled={userGame.status === 1} variant={userGame.status === 1 ? "danger" : "outline-danger"} onClick={userGame.status !== 1 ? ()=> handleChangeStatus(1, game.id, game.slug) : undefined} type="button">
                                    <FaTasks />
                                </Button>
                                <Button className={"mx-2"} disabled={userGame.status === 2} variant={(userGame.status === 2) ? "warning" : "outline-warning"} onClick={userGame.status !== 2 ? ()=> handleChangeStatus(2, game.id, game.slug) : undefined} type="button">
                                    <FaSpinner />
                                </Button>
                                <Button className={"mx-2"} disabled={userGame.status === 3} variant={(userGame.status === 3) ? "success" : "outline-success" } onClick={userGame.status !== 3 ? ()=> handleChangeStatus(3, game.id, game.slug) : undefined} type="button">
                                    <FaCheck />
                                </Button>
                            </>
                            :
                            <Button variant="info" type="button" onClick={(event) => {
                                let platformsGame = [];
                                game.platforms.map(item =>(
                                    platformsGame.push({
                                        "uuid" : item.platform.id,
                                        "name" : item.platform.name
                                    })
                                ))
                                handleAddGames({
                                    name: game.name,
                                    slug: game.slug,
                                    uuid: game.id,
                                    released: game.released,
                                    metacritic: game.metacritic,
                                    platforms : platformsGame}
                                )}}
                            >
                                <FaPlusCircle /> Add to collection
                            </Button>
                    }
                </Card.Footer>
            </Card>
        </Col>
    )

}

export default DashboardSearchResult;