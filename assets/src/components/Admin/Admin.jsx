import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, InputGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaSearch} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {getUsers} from "../../api/ApiUser";
import PlatformSelectService from "../../helpers/PlatformSelectService";
import DashBoardGamesTable from "../Dashboard/DashBoardGamesTable";
import AdminTable from "./AdminTable";

const initialStateSort = {
    name : "",
    nbResults: 0,
    datas : [],
    loaded: false,
    search : false
}

const Admin = ({user}) => {

    const [users, setUsers] = useState([]);
    const [sort, setSort] = useState(initialStateSort);
    const [load, setLoaded] = useState(false);
    const [trans, i18n] = useTranslation();

    useEffect(() => {
        getBacklogUsers();
    }, []);

    const handleSearchUser = (event) => {
        event.preventDefault();
        if(sort.name) {
            setSort(prevState => ({...prevState, loaded: false}));
            const results = PlatformSelectService.searchByNameAndPlatform(sort.name, false, users);
            console.log(results);
            setSort(prevState => ({...prevState, search:true, loaded: true, nbResults: results.nbResults, datas: results.datas}));
        }
    }

    const getBacklogUsers = () => {
        getUsers(i18n.language)
            .then(result => {
                setUsers(result.data)
            })
            .catch(() => {})
    }

    const resetResults = () => {
        setSort(initialStateSort);
    }

    return(
        <>
            <Row className="my-3 justify-content-center">
                <Col lg={10} md={12} sm={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSearchUser}>
                                <Form.Row>
                                    <Col md={10} sm={12} className={"my-1"}>
                                        <InputGroup>
                                            <Form.Control
                                                type={"text"}
                                                placeholder={"User search"}
                                                onChange={event => setSort(prevState => ({
                                                    ...prevState,
                                                    name: event.target.value
                                                }))}
                                                value={sort.name}
                                            />
                                            {
                                                sort.search ?
                                                    <OverlayTrigger
                                                        placement={"bottom"}
                                                        overlay={<Tooltip id={"tooltip-bottom"}>
                                                            <strong>Reset search</strong>
                                                        </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className={"mx-1"}
                                                            id="button-addon"
                                                            onClick={() => resetResults()}
                                                        >
                                                            <ImCross/>
                                                        </Button>
                                                    </OverlayTrigger>
                                                    :
                                                    ""
                                            }
                                        </InputGroup>
                                    </Col>
                                    <Col md={2} sm={12} className="my-1 justify-content-sm-center">
                                        <Button type="submit"><FaSearch/> Rechercher</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                sort.search ?
                    <Row>
                        <Col>
                            {
                                sort.nbResults > 0 ?
                                    <AdminTable title={trans("main.dashboard.games.status.titles.results") + " : " + sort.nbResults} users={sort.datas}/>
                                    :
                                    <Row className="my-3">
                                        <Col>
                                            <h3>{trans("main.dashboard.games.searchbar.error")} !</h3>
                                        </Col>
                                    </Row>
                            }
                        </Col>
                    </Row>
                    :
                    <AdminTable title={"My users"} users={users}/>
            }
        </>
    )
}

export default Admin;