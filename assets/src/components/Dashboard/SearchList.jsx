import React, {useState, useEffect} from "react";
import {Button, Card, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaCheck, FaPlusCircle, FaSearch, FaSpinner, FaTasks} from "react-icons/fa";
import {useDispatch} from "react-redux";
import placeholderImage from "../../img/placeholder-image.png";
import {reformatDate} from "../../helpers/MiscService";
import {addGameAsync} from "../../store/game";

const SearchList = ({game, userGames, handleChangeStatus, handleAddGame, handleShowModal, setGameInfoUuid}) => {

    const [userGame, setUserGame] = useState(null);
    const [stateValue, setStateValue] = useState("");
    const [trans , i18n] = useTranslation();
    const dispatch = useDispatch();

    if (userGames) {
        useEffect(() => {
            console.log(userGames);
            let search = userGames.find(item => item.uuid === game.id);
            if(search) {
                setStateValue(search.user_game_statuses[0].status.id);
                setUserGame(search)
            }
        }, [userGames])
    }

    return (
        <Col className={"my-3"}>
            <Card>
                <Card.Img className={"card-img-custom"} variant={"top"}  src={game.background_image ? game.background_image : placeholderImage} />
                <Card.Body>
                    <div className={"card-title text-truncate"}>{game.name}</div>
                    <Card.Text><strong>{trans("main.dashboard.games.status.modal.date")} : </strong>{reformatDate(game.released)}</Card.Text>
                </Card.Body>
                <Card.Footer className={"text-center border-top-blue-grey border-top-lighten-5"}>
                    {
                        userGame ?
                            <>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>{trans("main.dashboard.games.status.card.btn_labels.to_do")}</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.user_game_statuses[0].status.id === 1} variant={userGame.user_game_statuses[0].status.id === 1 ? "danger" : "outline-danger"} onClick={userGame.user_game_statuses[0].status.id !== 1 ? ()=> handleChangeStatus(1, game.id) : undefined} type={"button"}>
                                        <FaTasks />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>{trans("main.dashboard.games.status.card.btn_labels.in_progress")}</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.user_game_statuses[0].status.id === 2} variant={(userGame.user_game_statuses[0].status.id === 2) ? "warning" : "outline-warning"} onClick={userGame.user_game_statuses[0].status.id !== 2 ? ()=> handleChangeStatus(2, game.id) : undefined} type={"button"}>
                                        <FaSpinner />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement={"bottom"}
                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                        <strong>{trans("main.dashboard.games.status.card.btn_labels.finished")}</strong>
                                    </Tooltip>
                                    }
                                >
                                    <Button className={"mx-2"} disabled={userGame.user_game_statuses[0].status.id === 3} variant={(userGame.user_game_statuses[0].status.id === 3) ? "success" : "outline-success" } onClick={userGame.user_game_statuses[0].status.id !== 3 ? ()=> handleChangeStatus(3, game.id) : undefined} type={"button"}>
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
                                <FaPlusCircle /> {trans("main.dashboard.games.status.card.add")}
                            </Button>
                    }
                    <OverlayTrigger
                        placement={"bottom"}
                        overlay={<Tooltip id={"tooltip-bottom"}>
                            <strong>{trans("main.dashboard.games.status.card.table.tags.action_label")}</strong>
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

export default SearchList;