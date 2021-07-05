import React from "react";
import {Badge, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaTrash} from "react-icons/fa";
import {deleteUser} from "../../api/ApiUser";
import {reformatDate} from "../../helpers/MiscService";

const AdminTableRow = ({user, setUserInfo, handleShow}) => {

    const [trans , i18n] = useTranslation();

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
                    setUserInfo(user);
                    handleShow();
                }}>
                    <FaTrash />
                </Button>
            </td>
        </tr>
    )
}

export default AdminTableRow;