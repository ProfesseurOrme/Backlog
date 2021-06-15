import React from "react";
import {Badge, Button} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import {NavLink} from "react-router-dom";

const DashboardGamesTableRow = ({game, handleShowModal, setGameInfoUuid}) => {
    return (
        <tr>
            <td style={{width: "30%"}} className="text-truncate">
                {game.name}
            </td>
            <td style={{width: "60%"}}>
                {game.platforms ? game.platforms.map(item => (
                    <Badge key={item.uuid} pill variant="primary" className={"mx-1"}>
                        {item.name}
                    </Badge>
                )) : ""}
            </td>
            <td style={{width: "10%"}} className={"text-center"}>
                <Button onClick={() => {
                    handleShowModal();
                    setGameInfoUuid(game.uuid);
                }}>
                    <FaSearch />
                </Button>
            </td>
        </tr>
    )
}

export default DashboardGamesTableRow;