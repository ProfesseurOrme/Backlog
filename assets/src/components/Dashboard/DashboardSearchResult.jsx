import React, {useState, useEffect} from "react";
import {Button, ButtonGroup, Card, Col, OverlayTrigger, ToggleButton, Tooltip} from "react-bootstrap";
import {FaCheck, FaPlusCircle, FaSearch, FaSpinner, FaTasks} from "react-icons/fa";
import placeholderImage from "../../img/placeholder-image.png";
import {reformatDate} from "../../helpers/MiscService";
import {setGameWithUser, updateGameUserStatus} from "../../api/ApiGames";
import DataService from "../../helpers/DataService";

const DashboardSearchResult = ({game, userGames, handleChangeStatus, handleAddGame, handleShowModal, setGameInfoUuid}) => {

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

    return (
        <Col className={"my-3"}>
            <Card>
                <Card.Img className={"card-img-custom"} variant={"top"}  src={game.background_image ? game.background_image : placeholderImage} />
                <Card.Body>
                    <Card.Title className={"text-truncate"}>{game.name}</Card.Title>
                    <Card.Text><strong>Release : </strong>{reformatDate(game.released)}</Card.Text>
                </Card.Body>
                <Card.Footer className={"text-center border-top-blue-grey border-top-lighten-5"}>
                    {
                        userGame ?
                            <>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>Set to "to do" !</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.status === 1} variant={userGame.status === 1 ? "danger" : "outline-danger"} onClick={userGame.status !== 1 ? ()=> handleChangeStatus(1, game.id, game.slug) : undefined} type={"button"}>
                                        <FaTasks />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>Set to "in progress" !</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.status === 2} variant={(userGame.status === 2) ? "warning" : "outline-warning"} onClick={userGame.status !== 2 ? ()=> handleChangeStatus(2, game.id, game.slug) : undefined} type={"button"}>
                                        <FaSpinner />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>Set to "done" !</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.status === 3} variant={(userGame.status === 3) ? "success" : "outline-success" } onClick={userGame.status !== 3 ? ()=> handleChangeStatus(3, game.id, game.slug) : undefined} type={"button"}>
                                       <FaCheck />
                                    </Button>
                                </OverlayTrigger>
                            </>
                            :
                            <Button
                                variant={"info"} className={"mx-1"} type={"button"}
                                onClick={(event) => {
                                    let platformsGame = [];
                                    game.platforms.map(item =>(
                                        platformsGame.push({
                                            "uuid" : item.platform.id,
                                            "name" : item.platform.name
                                        })
                                    ))
                                    handleAddGame({
                                        name: game.name,
                                        slug: game.slug,
                                        uuid: game.id,
                                        released: game.released,
                                        platforms : platformsGame
                                    })
                                }}
                            >
                                <FaPlusCircle /> Add to collection
                            </Button>
                    }
                    <OverlayTrigger
                        placement={"bottom"}
                        overlay={<Tooltip id={"tooltip-bottom"}>
                            <strong>Show details</strong>
                        </Tooltip>
                        }
                    >
                        <Button onClick={() => {
                            handleShowModal();
                            setGameInfoUuid(game.id.toString());
                        }}>
                            <FaSearch />
                        </Button>
                    </OverlayTrigger>
                </Card.Footer>
            </Card>
        </Col>
    )

}

export default DashboardSearchResult;