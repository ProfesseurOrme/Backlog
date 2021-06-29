import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";

const Login = ({setUser}) => {

    const [data, setData] = useState(({
        username : "",
        password: ""
    }))
    const [error, setError] = useState("");
    const [trans, i18n] = useTranslation();
    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();

        AuthService.login(i18n.language, data)
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
                    <Card className={"mb-3"}>
                        <Card.Header>
                            <Card.Title>{trans("main.title")}</Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className={"justify-content-md-center flex-grow-1"}>
                <Col lg={6} md={8} sm={12}>
                    <Card className={"my-3"}>
                        <Card.Header>
                            <Card.Text>{trans("main.login.title")}</Card.Text>
                        </Card.Header>
                        <Card.Body className={"p-4"}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                                    <Form.Label>{trans("main.login.inputs.username_label")}</Form.Label>
                                    <Form.Control
                                        type={"username"}
                                        name={"username"}
                                        placeholder={trans("main.login.inputs.username_placeholder")}
                                        value={data.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                                    <Form.Label>{trans("main.login.inputs.password_label")}</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        placeholder={trans("main.login.inputs.password_placeholder")}
                                        name={"password"}
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div className={"d-flex justify-content-center"}>
                                    <Button variant={"primary"} type={"submit"}>
                                        {trans("main.login.inputs.submit")}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p className={"text-body text-center"}>
                                <Link to={"/register"} >{trans("main.login.inputs.account")}</Link>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Login;