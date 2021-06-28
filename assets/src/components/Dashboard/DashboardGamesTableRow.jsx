import React from "react";
import {Badge, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaSearch} from "react-icons/fa";

const DashboardGamesTableRow = ({game, handleShowModal, setGameInfoUuid}) => {

    const [trans, i18n] = useTranslation();

    return (
        <tr>
            <td style={{width: "30%"}} className={"cell-truncate"}>
                {game.name}
            </td>
            <td style={{width: "60%"}} className={"cell-truncate"}>
                {game.platforms ? game.platforms.map(item => (
                    <Badge key={item.uuid} pill variant="primary" className={"mx-1"}>
                        {item.name}
                    </Badge>
                )) : ""}
            </td>
            <td style={{width: "10%"}} className={"text-center"}>
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={<Tooltip id={"tooltip-bottom"}>
                        <strong>{trans("main.dashboard.games.status.card.table.tags.action_label")}</strong>
                    </Tooltip>
                    }
                >
                    <Button onClick={() => {
                        handleShowModal();
                        setGameInfoUuid(game.uuid);
                    }}>
                        <FaSearch />
                    </Button>
                </OverlayTrigger>
            </td>
        </tr>
    )
}

export default DashboardGamesTableRow;