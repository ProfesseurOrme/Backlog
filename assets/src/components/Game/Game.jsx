import React , {useState, useEffect} from "react";
import {Badge, Button, Media, Modal, Spinner} from "react-bootstrap";
import {reformatDate, splitArray} from "../../helpers/MiscService";
import {useParams, useLocation} from "react-router-dom";
import {delay} from "../../helpers/DelayService";
import {getGame} from "../../api/ApiRawg";

const Game = ({showModal, handleCloseModal, gameInfoUuid, setGameInfoUuid}) => {

    const [gameInfo, setGameInfo] = useState({});
    const [userRating, setUserRating] = useState({});
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(showModal) {
            getGameInfo(gameInfoUuid);
        }
    }, [gameInfoUuid]);

    const getGameInfo = async(uuid) => {
        getGame(uuid)
            .then(result => {
                setGameInfo(result.data)
            })
            .catch(error => {
                setError(error.message)
            })
        await delay(1000);
        setLoaded(true)
    }

    console.log(gameInfo);

    //To Do
    const rateGame = () => {}

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
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-custom"
                centered
                scrollable={true}
            >
                { loaded ?
                    <>
                        <Modal.Header className={"border-bottom-0"} closeButton>
                            <Modal.Title>{gameInfo.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Media>
                                <img alt={"image : " + gameInfo.name} src={gameInfo.background_image} className={"align-self-start mr-3"} />
                                <Media.Body>
                                    <p className={"text-body"}><strong>Release date : </strong>{gameInfo.released ? reformatDate(gameInfo.released) : "TBA"}</p>
                                    <p className={"text-body"}><strong>Publishers :</strong> {typeof gameInfo.publishers !== 'undefined' && gameInfo.publishers.length > 0 ? splitArray(gameInfo.publishers) : "Not specified"}</p>
                                    <p className={"text-body"}><strong>Developers :</strong> {typeof gameInfo.developers !== 'undefined' && gameInfo.developers.length > 0 ? splitArray(gameInfo.developers) : "Not specified"}</p>
                                    <div className={"text-body"}>
                                        <strong>Platforms : </strong>{gameInfo.platforms ? gameInfo.platforms.map(item => (
                                        <Badge key={item.platform.id} pill variant="primary" className={"mx-1"}>
                                            {item.platform.name}
                                        </Badge>
                                    )) : ""}
                                    </div>
                                </Media.Body>
                            </Media>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </>
                    :
                    <Modal.Body className={"text-center"}>
                        <Spinner animation="border" variant="primary" />
                    </Modal.Body>
                }
            </Modal>
        </>
    );
}

export default Game;