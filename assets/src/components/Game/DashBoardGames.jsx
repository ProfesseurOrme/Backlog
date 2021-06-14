import React, {useState, useEffect} from "react";
import {Card, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import DashboardGamesLine from "./DashboardGamesLine";

const DashBoardGames =({title, games}) => {

    const [pagination, setPagination] = useState({
        data: games,
        offset: 0,
        numberPerPage: 4,
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

    return (
        <Card className="my-3">
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
                <Table responsive>
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
                                <DashboardGamesLine key={game.uuid} game={game} />
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
                    <Card.Footer className="text-center">
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
                        : ""
            }
        </Card>
    )
}

export default DashBoardGames;