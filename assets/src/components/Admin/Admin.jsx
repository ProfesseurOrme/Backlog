import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import AdminTable from "./AdminTable";

const Admin = ({user}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

    }, []);

    return(
        <>
            <p>Coucou {user.data.user}</p>
            <AdminTable />
        </>
    )
}

export default Admin;