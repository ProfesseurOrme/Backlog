import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";
import DataService from "../../helpers/DataService";
import background from "../../img/background.svg";

const Login = ({setUser}) => {

    const [data, setData] = useState(({
        username : "",
        password: ""
    }))
    const [error, setError] = useState("");

    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();

        const loginResult = AuthService.login(DataService.API_URL, data)
            .then(result => {
                setUser(result);
            }).catch(error => {
                setError(error)
            })
            .finally(() => {
                history.push("/");
            })
        ;
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({...prevState, [name]: value}));
    };

    return (
        // { error ? <AlertDefault message={error} variant={'danger'} /> : "" }
        <>
            <Row className={"h-100"}>
                <Col sm={12} className={"p-0"}>
                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>Backlog.io</Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className={"justify-content-md-center flex-grow-1"}>
                <Col lg={6} md={8} sm={12}>
                    <Card className="my-3">
                        <Card.Header>
                            <Card.Text>Sign In</Card.Text>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={data.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p className={"text-body text-center"}>
                                <Link to="/register" >You don't have an account ? click here !</Link>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Login;