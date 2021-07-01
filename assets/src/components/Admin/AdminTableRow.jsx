import React from "react";
import {Badge, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaSearch} from "react-icons/fa";
import {reformatDate} from "../../helpers/MiscService";

const AdminTableRow = ({user}) => {
    return (
        <tr>
            <td style={{width: "30%"}} className={"cell-truncate"}>
                {user.username}
            </td>
            <td style={{width: "30%"}} className={"cell-truncate"}>
                {user.email}
            </td>
            <td style={{width: "30%"}} className={"cell-truncate"}>
                {reformatDate(user.created_at)}
            </td>
            <td style={{width: "30%"}} className={"cell-truncate"}>
                <Button onClick={() => {
                    console.log("oui")
                }}>
                    <FaSearch />
                </Button>
            </td>
        </tr>
    )
}

export default AdminTableRow;