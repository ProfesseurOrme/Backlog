import React, {useState, useEffect} from "react";
import {Card, Table} from "react-bootstrap";
import {FaCheck, FaSpinner, FaTasks} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardGamesTableRow from "./DashboardGamesTableRow";

const DashBoardGamesTable =({user, title, games, handleShowModal, setGameInfoUuid}) => {

    const [pagination, setPagination] = useState({
        data: games,
        offset: 0,
        numberPerPage: 8,
        pageCount: 0,
        currentData: []
    });

    useEffect(() => {
        setPagination((prevState) => ({
            ...prevState,
            data: games,
            pageCount: prevState.data.length / prevState.numberPerPage,
            currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset, games]);

    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    const titleColor = (title) => {
        let color, icon;
        switch (title) {
            case "In Progress":
                icon = <FaSpinner />;
                color = "text-warning";
            break;
            case "To Do":
                icon= <FaTasks />
                color = "text-danger";
            break;
            case "Finished" :
                icon= <FaCheck />;
                color = "text-success";
            break;
        }

        return {
            icon : icon,
            color: color
        };
    }

    return (
        <Card className="my-3">
            <Card.Header>
                <Card.Text className={titleColor(title).color + " h5"}>{title} {titleColor(title).icon}</Card.Text>
            </Card.Header>
            <Card.Body className="p-0">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Platforms
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        games.length > 0 ?
                            pagination.currentData && pagination.currentData.map(game => (
                                <DashboardGamesTableRow handleShowModal={handleShowModal} setGameInfoUuid={setGameInfoUuid} key={game.uuid} game={game} />
                            ))
                            :
                            <tr>
                                <td>There is no game in this status</td>
                            </tr>
                    }
                    </tbody>
                </Table>
            </Card.Body>
            {
                pagination.pageCount > 1 ?
                    <Card.Footer className="d-flex justify-content-center">
                        <ReactPaginate
                            containerClassName="pagination"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageClassName="page-item"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            pageLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            activeClassName="active"
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

export default DashBoardGamesTable;