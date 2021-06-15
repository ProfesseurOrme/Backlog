import React, {useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import DashBoardGamesTable from "./DashBoardGamesTable";

const DashboardGames = ({userGames, handleShowModal, setGameInfoUuid}) => {

    const [state, setState] = useState({
        toDo: [],
        inProgress: [],
        finished: []
    })

    useEffect(() => {
        if(userGames) {
            setState({
                toDo: [],
                inProgress: [],
                finished: []
            })
            userGames.forEach((item) => {
                switch (item.status) {
                    case 1 : setState(prevState => ({...prevState, toDo : [...prevState.toDo, item]}))
                        break;
                    case 2 : setState(prevState => ({...prevState, inProgress : [...prevState.inProgress, item]}))
                        break;
                    case 3 : setState(prevState => ({...prevState, finished : [...prevState.finished, item]}))
                        break;
                }
            })
        }
    }, [userGames]);

    return (
        <>
            {state.inProgress.length > 0 ?
                <DashBoardGamesTable title={"In Progress"} handleShowModal={handleShowModal} setGameInfoUuid={setGameInfoUuid} games={(state.inProgress.length > 0) ? state.inProgress : undefined} />
                :
                ""
            }

            {state.toDo.length > 0 ?
                <DashBoardGamesTable title={"To Do"} handleShowModal={handleShowModal} setGameInfoUuid={setGameInfoUuid} games={(state.toDo.length > 0) ? state.toDo : undefined} />
                :
                ""
            }

            {state.finished.length > 0 ?
                <DashBoardGamesTable title={"Finished"} handleShowModal={handleShowModal} setGameInfoUuid={setGameInfoUuid} games={(state.finished.length > 0) ? state.finished : undefined} />
                :
                ""
            }
        </>
    )
}

export default DashboardGames;