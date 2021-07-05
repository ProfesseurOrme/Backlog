import React from "react";
import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {deleteUser} from "../../api/ApiUser";

const AdminModal = ({show, handleClose, user}) => {

    const [trans, i18n] = useTranslation();

    const removeUser = (username) => {
        deleteUser(i18n.language, username)
            .then(_ => {})
    }

    return (
        <>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{trans("main.admin.modal.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{trans("main.admin.modal.body")} : <strong>{user.username} ?</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {trans("main.admin.modal.cancel")}
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        removeUser(user.username);
                    }}>
                        {trans("main.admin.modal.delete")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminModal;