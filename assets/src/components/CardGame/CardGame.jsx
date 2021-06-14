import React , {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import background from "../../img/background.svg";
import {getGame} from "../../api/ApiRawg";

const CardGame = () => {

    let {uuid, slug} = useParams();
    let location = useLocation();

    const [gameInfo, setGameInfo] = useState({});
    const [userRating, setUserRating] = useState({});
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getGameInfo(uuid);
    }, [userRating]);

    const getGameInfo = (uuid) => {
        getGame(uuid)
            .then(result => {
                setGameInfo(result.data)
                setLoaded(true)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <>
            { loaded ?


                "": ""}
        </>
    );
}

export default CardGame;