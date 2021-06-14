import React from "react";
import {Button} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import {NavLink} from "react-router-dom";

const DashboardGamesLine = ({game}) => {
    return (
        <tr>
            <td style={{width: "30%"}} className="text-truncate">
                {game.name}
            </td>
            <td style={{width: "60%"}}>
                {game.platforms ? game.platforms.map(item => (
                          item.name + " "
                )) : ""}
            </td>
            <td style={{width: "10%"}} className={"text-center"}>
                <Button as={NavLink} to={{
                    pathname : "/game/"+game.uuid+"/"+game.slug,
                    aboutProps : (game) ? game : null
                }}>
                    <FaSearch />
                </Button>
            </td>
        </tr>
    )
}

export default DashboardGamesLine;