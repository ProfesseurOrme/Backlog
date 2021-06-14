import React, {useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import DashBoardGames from "./DashBoardGames";

const Dashboard = ({userGames}) => {

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

    console.log(state)

    return (
        <>
            {state.inProgress.length > 0 ?
                <DashBoardGames title={"In Progress"} games={(state.inProgress.length > 0) ? state.inProgress : undefined} />
                :
                ""
            }

            {state.toDo.length > 0 ?
                <DashBoardGames title={"To Do"} games={(state.toDo.length > 0) ? state.toDo : undefined} />
                :
                ""
            }

            {state.finished.length > 0 ?
                <DashBoardGames title={"Finished"} games={(state.finished.length > 0) ? state.finished : undefined} />
                :
                ""
            }
        </>
    )
}

export default Dashboard;