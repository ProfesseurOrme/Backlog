import React , {useState, useEffect} from "react";
import {Badge, Button, Card, Col, Media, Modal, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {FaAt, FaCheck, FaGamepad, FaPlusCircle, FaReddit, FaSpinner, FaTasks} from "react-icons/fa";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {getGameStatistics} from "../../api/ApiGames";
import {getRating, setRating, updateRating} from "../../api/ApiRating";
import {reformatDate, splitArray} from "../../helpers/MiscService";
import {delay} from "../../helpers/DelayService";
import {getGame} from "../../api/ApiRawg";
import placeholderImage from "../../img/placeholder-image.png";

/**
 * Note : Sometimes, RAWG API can remove some entries, so you have to use data from our API to display the desired modal
 */

const Game = ({user, showModal, handleCloseModal, game, gameInfoUuid, setGameInfoUuid, handleChangeStatus, handleAddGames}) => {

    const [gameInfo, setGameInfo] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [gameStatistics, setGameStatistics] = useState(null);
    const [trans, i18n] = useTranslation();

    useEffect(() => {
        if(showModal) {
            setGameInformations(gameInfoUuid).then(() => {});
        }
    }, [gameInfoUuid]);

    const setGameInformations = async(uuid) => {
        setLoaded(false);
        await Promise.all([getGameInfo(uuid), getGameRating(uuid), getStatistics(uuid)])
            .then(values => {
                values[0] ? setGameInfo(values[0]) : setGameInfo(null);
                values[1] ? setUserRating(values[1]) : setUserRating(null);
                values[2] ? setGameStatistics(values[2]) : setGameStatistics(null);
            })
        ;
        await delay(1000);
        setLoaded(true)
    }

    const getGameInfo = (uuid) => {
        return getGame(uuid)
            .then(result => {
                return result.data
            })
            .catch(error => {
                return error.message
            })
            ;
    }

    const getStatistics= (uuid) => {
        return getGameStatistics(i18n.language, uuid)
            .then(result => {return result.data})
            .catch(error => {})
            ;
    }

    const getGameRating = (uuid) => {
        return getRating(i18n.language, uuid)
            .then(result => {
                return result.data;
            })
            .catch(error => {})
    }

    const setGameRating = (rating) => {
        setRating(i18n.language, {rating: rating}, gameInfoUuid )
            .then(result => {})
            .catch(error => {})
        ;
    };

    const updateGameRating = (rating) => {
        updateRating(i18n.language, {...userRating, rating: rating}, gameInfoUuid )
            .then(_ => setUserRating(prevState => ({...prevState, rating : rating})))
            .catch(error => {})
        ;
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setGameInfo({});
                    setLoaded(false);
                    setGameInfoUuid("");
                    handleCloseModal();
                }}
                backdrop={"static"}
                keyboard={false}
                dialogClassName={"modal-custom"}
                centered
                scrollable={false}
            >
                { loaded ?
                    <>
                        <Modal.Header className={"border-bottom-0"} closeButton>
                            <Modal.Title>{game ? game.name : gameInfo.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Media className={"media-data"}>
                                <img alt={"image : " + (game ?  + game.name : gameInfo.name)} src={gameInfo && gameInfo.background_image ? gameInfo.background_image : placeholderImage } className={"mr-3"} />
                                <Media.Body >
                                    <p className={"text-body"}>
                                        <strong>{trans("main.dashboard.games.status.modal.date")} : </strong>{gameInfo && gameInfo.released ? reformatDate(gameInfo.released) : "TBA"}
                                    </p>
                                    <p className={"text-body"}>
                                        <strong>{trans("main.dashboard.games.status.modal.publishers")} :</strong> {gameInfo ? (typeof gameInfo.publishers !== 'undefined' && gameInfo.publishers.length > 0 ? splitArray(gameInfo.publishers) : "Not specified") : "Deleted from API"}
                                    </p>
                                    <p className={"text-body"}>
                                        <strong>{trans("main.dashboard.games.status.modal.developers")} :</strong> {gameInfo ? (typeof gameInfo.developers !== 'undefined' && gameInfo.developers.length > 0 ? splitArray(gameInfo.developers) : "Not specified") : "Deleted from API"}
                                    </p>
                                    { gameInfo ?  (gameInfo.reddit_url || gameInfo.metacritic_url ?
                                        <p className={"text-body"}><strong>{trans("main.dashboard.games.status.modal.medias.title")} :</strong>
                                            {gameInfo.website ?
                                                <OverlayTrigger
                                                    placement={"bottom"}
                                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                                        <strong>{trans("main.dashboard.games.status.modal.medias.website_label")}</strong>.
                                                    </Tooltip>
                                                    }
                                                >
                                                    <a href={gameInfo.website} target={"_blank"}
                                                       className={"text-body-icon primary mx-1"}>
                                                        <FaAt size={30}/>
                                                    </a>
                                                </OverlayTrigger>
                                                :
                                                ""
                                            }
                                            {gameInfo.reddit_url ?
                                                <OverlayTrigger
                                                    placement={"bottom"}
                                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                                        <strong>{trans("main.dashboard.games.status.modal.medias.reddit_label")}</strong>.
                                                    </Tooltip>
                                                    }
                                                >
                                                    <a href={gameInfo.reddit_url} target={"_blank"}
                                                       className={"text-body-icon primary mx-1"}>
                                                        <FaReddit size={30}/>
                                                    </a>
                                                </OverlayTrigger>
                                                :
                                                ""
                                            }
                                            {gameInfo.metacritic_url ?
                                                <OverlayTrigger
                                                    placement={"bottom"}
                                                    overlay={<Tooltip id={"tooltip-bottom"}>
                                                        <strong>{trans("main.dashboard.games.status.modal.medias.metacritic_label")}</strong>.
                                                    </Tooltip>
                                                    }
                                                >
                                                    <a href={gameInfo.metacritic_url} target={"_blank"}
                                                       className={"text-body-icon primary mx-1"}>
                                                        <FaGamepad size={30}/>
                                                    </a>
                                                </OverlayTrigger>
                                                :
                                                ""
                                            }
                                        </p>
                                        :
                                        "")
                                        : ""
                                    }
                                    <p className={"text-body"}>
                                        <strong>{trans("main.dashboard.games.status.modal.platforms")} : </strong>{gameInfo ? (gameInfo.platforms ? gameInfo.platforms.map(item => (
                                        <Badge key={item.platform.id} pill variant={"primary"} className={"mx-1"}>
                                            {item.platform.name}
                                        </Badge>
                                    )) : "") : "Deleted from API"}
                                    </p>

                                    {
                                        game ?
                                            <>
                                                <div className={"text-body"}><strong>{trans("main.dashboard.games.status.modal.rating.rate")} : {userRating ? userRating.rating + " /5" : ""} {gameStatistics.rating ? "(" + trans("main.dashboard.games.status.modal.rating.average" , {rate : gameStatistics.rating}) + ")" : ""}</strong></div>
                                                <ReactStars
                                                    count={5}
                                                    onChange={userRating ? updateGameRating : setGameRating}
                                                    size={24}
                                                    isHalf={true}
                                                    emptyIcon={<BsStar />}
                                                    halfIcon={<BsStarHalf />}
                                                    fullIcon={<BsStarFill/>}
                                                    activeColor={"#007bff"}
                                                    value={userRating ? userRating.rating : 0}
                                                />
                                            </>
                                            :
                                            ""
                                    }
                                </Media.Body>
                            </Media>
                            <Row>
                                <Col>
                                    <p className="h5 my-3">{trans("main.dashboard.games.status.modal.now")} : { gameStatistics ? gameStatistics.nb_players : trans("main.dashboard.games.status.modal.none")}</p>
                                </Col>
                            </Row>
                            { gameStatistics ?
                                <Row>
                                    <Col sm={4}>
                                        <Card border={"danger"} className={"card-stats"}>
                                            <div className={"card-content"}>
                                                <Card.Body className={"card-stats-body"}>
                                                    <Media className={"d-flex"}>
                                                        <div className={"align-self-center"}>
                                                            <FaTasks className={"text-danger float-left"} />
                                                        </div>
                                                        <Media.Body className={"text-right"}>
                                                            <h3>{gameStatistics.statistics.to_do}</h3>
                                                            <span className={"text-danger"}>{trans("main.dashboard.games.status.titles.to_do")}</span>
                                                        </Media.Body>
                                                    </Media>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col sm={4}>
                                        <Card border={"warning"} className={"card-stats"}>
                                            <div className={"card-content"}>
                                                <Card.Body className={"card-stats-body"}>
                                                    <Media className={"d-flex"}>
                                                        <div className={"align-self-center"}>
                                                            <FaTasks className={"text-warning float-left"}/>
                                                        </div>
                                                        <Media.Body className={"text-right"}>
                                                            <h3>{gameStatistics.statistics.in_progress}</h3>
                                                            <span className={"text-warning"}>{trans("main.dashboard.games.status.titles.in_progress")}</span>
                                                        </Media.Body>
                                                    </Media>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col sm={4}>
                                        <Card border={"success"} className={"card-stats"}>
                                            <div className={"card-content"}>
                                                <Card.Body className={"card-stats-body"}>
                                                    <Media className={"d-flex"}>
                                                        <div className={"align-self-center"}>
                                                            <FaTasks className={"text-success float-left"}/>
                                                        </div>
                                                        <Media.Body className={"text-right"}>
                                                            <h3>{gameStatistics.statistics.finished}</h3>
                                                            <span className={"text-success"}>{trans("main.dashboard.games.status.titles.finished")}</span>
                                                        </Media.Body>
                                                    </Media>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                                :
                                ""
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                game ?
                                    <>
                                        <OverlayTrigger
                                            placement={"bottom"}
                                            overlay={<Tooltip id={"tooltip-bottom"}>
                                                <strong>{trans("main.dashboard.games.status.card.btn_labels.to_do")}</strong>.
                                            </Tooltip>
                                            }
                                        >
                                            <Button className={"mx-2"} disabled={game.status === 1} variant={game.status === 1 ? "danger" : "outline-danger"} onClick={game.status !== 1 ? ()=> handleChangeStatus(1, game.uuid, game.slug) : undefined} type={"button"}>
                                                <p className={"modal-footer-btn-label"}><span>{trans("main.dashboard.games.status.titles.to_do")}</span> <FaTasks /></p>
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement={"bottom"}
                                            overlay={<Tooltip id={"tooltip-bottom"}>
                                                <strong>{trans("main.dashboard.games.status.card.btn_labels.in_progress")}</strong>.
                                            </Tooltip>
                                            }
                                        >
                                            <Button className={"mx-2"} disabled={game.status === 2} variant={(game.status === 2) ? "warning" : "outline-warning"} onClick={game.status !== 2 ? ()=> handleChangeStatus(2, game.uuid, game.slug) : undefined} type={"button"}>
                                                <p className={"modal-footer-btn-label"}><span>{trans("main.dashboard.games.status.titles.in_progress")} </span><FaSpinner /></p>
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement={"bottom"}
                                            overlay={<Tooltip id={"tooltip-bottom"}>
                                                <strong>{trans("main.dashboard.games.status.card.btn_labels.finished")}</strong>.
                                            </Tooltip>
                                            }
                                        >
                                            <Button className={"mx-2"} disabled={game.status === 3} variant={(game.status === 3) ? "success" : "outline-success" } onClick={game.status !== 3 ? ()=> handleChangeStatus(3, game.uuid, game.slug) : undefined} type={"button"}>
                                                <p className={"modal-footer-btn-label"}><span>{trans("main.dashboard.games.status.titles.finished")} </span><FaCheck /></p>
                                            </Button>
                                        </OverlayTrigger>
                                    </>
                                    :
                                    <Button variant={"info"} type={"button"} onClick={(event) => {
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
                                        <FaPlusCircle /> {trans("main.dashboard.games.status.card.add")}
                                    </Button>
                            }
                        </Modal.Footer>
                    </>
                    :
                    <Modal.Body className={"text-center"}>
                        <Spinner animation={"border"} variant={"primary"} />
                    </Modal.Body>
                }
            </Modal>
        </>
    );
}

export default Game;