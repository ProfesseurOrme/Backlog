import React, {useState, useEffect} from "react";
import {Card, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import AdminTableRow from "./AdminTableRow";

const AdminTable = ({users, title}) => {

    const [pagination, setPagination] = useState({
        data: users,
        offset: 0,
        numberPerPage: 20,
        pageCount: 0,
        currentData: []
    });
    const [trans, i18n] = useTranslation();

    useEffect(() => {
        setPagination((prevState) => ({
            ...prevState,
            data: users,
            pageCount: prevState.data.length / prevState.numberPerPage,
            currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset, users, pagination.data]);

    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    return (
        <Card className={"my-3 card-games"}>
            <Card.Header>
                <Card.Text className={"h5"}>{title}</Card.Text>
            </Card.Header>
            <Card.Body className="p-0">
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Created at
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.length > 0 ?
                            pagination.currentData && pagination.currentData.map(user => (
                                <AdminTableRow key={user.id} user={user} />
                            ))
                            :
                            <tr>
                                <td>{trans("main.dashboard.games.status.card.table.tags.empty")}</td>
                            </tr>
                    }
                    </tbody>
                </Table>
            </Card.Body>
            {
                pagination.pageCount > 1 ?
                    <Card.Footer className={"d-flex justify-content-center"}>
                        <ReactPaginate
                            containerClassName={"pagination"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            pageClassName={"page-item"}
                            previousClassName={"page-item"}
                            nextClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            activeClassName={"active"}
                            pageCount={pagination.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                        />
                    </Card.Footer>
                    :
                    ""
            }
        </Card>
    )
}

export default AdminTable;