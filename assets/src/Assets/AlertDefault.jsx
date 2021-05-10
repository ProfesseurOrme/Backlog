import React from "react";
import {Alert} from "react-bootstrap";

const AlertDefault = ({variant,message}) => {
    return (
        <Alert variant={variant}>
            {message}
        </Alert>
    )
}

export default AlertDefault;