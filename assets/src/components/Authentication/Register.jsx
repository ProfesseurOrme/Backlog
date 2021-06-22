import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";
import DataService from "../../helpers/DataService";
import background from "../../img/background.svg";
import {getUser} from "../../api/ApiUser";

const Register = () => {

    const [form, setForm] = useState({
        fields: {
            username: "",
            email: "",
            name: "",
            lastname: "",
            password : ""
        },
        errors: {
            username: "",
            email: "",
            name: "",
            lastname: "",
            password : ""
        }
    });

    const [disabled, setDisabled] = useState(true);

    let history = useHistory();

    useEffect(() => {
        if((form.fields.username && form.fields.email && form.fields.name && form.fields.lastname && form.fields.password) && (!form.errors.username && !form.errors.email && !form.errors.name && !form.errors.lastname && !form.errors.password)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[form.fields.username,form.fields.email,form.fields.name,form.fields.lastname,form.fields.password,form.errors.username,form.errors.email,form.errors.name,form.errors.lastname,form.errors.password])


    const testUsername = {
        regex : /^[0-9a-zA-Z]{4,}$/,
        error: "Your username must contain at least 4 digits or letters"
    }

    const testEmail = {
        regex : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        error : "Your email is not in the correct format"
    };

    const testPassword = {
        regex : /^[0-9a-zA-Z]{8,}$/,
        error: "Your password must contain at least 8 digits or letters"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        AuthService.register(DataService.API_URL, form.fields)
            .then(result => {
                history.push("/");
            })
        ;
    }

    const updateFormState = (field, value, error) => {
        setForm(prevData => ({
            fields : {
                ...prevData.fields,
                [field]: value
            },
            errors: {
                ...prevData.errors,
                [field]: error
            }
        }));
    }

    const handleUsername = async(field, value, test) => {

        const testThisValue = test.regex.test(value)
        if(testThisValue){
            const searchUsername = await getUser(DataService.API_URL, {username : value})
                .then(_ => {
                    return ""
                })
                .catch(error=> {
                    return error.response.data.message
                })
            updateFormState(field, value, searchUsername);
        } else {
            return updateFormState(field, value, test.error)
        }

    }

    const handleField = (field, value, test) => {
        updateFormState(field, value, (!test.regex.test(value) ? test.error : ""));
    }

    const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case "username" : handleUsername(name, value, testUsername);
            break;
            case "email" : handleField(name, value, testEmail);
            break;
            case "password": handleField(name, value, testPassword);
            break;
        }
        setForm(prevData => ({
            ...prevData
            , fields: {
                ...prevData.fields,
                [name]: value
            }
        }));
    };

    return (
        <>
            <Row className={"h-100"}>
                <Col sm={12} className={"p-0"}>
                    <Card className={"mb-3"}>
                        <Card.Header>
                            <Card.Title>Backlog.io</Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className={"justify-content-md-center flex-grow-1"}>
                <Col lg={6} md={8} sm={12}>
                    <Card className={"my-3"}>
                        <Card.Header>
                            <Card.Text>Sign In</Card.Text>
                        </Card.Header>
                        <Card.Body className={"p-4"}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={"mb-3"} controlId={"formBasicUsername"}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type={"username"}
                                        name={"username"}
                                        placeholder={"Enter your username"}
                                        value={form.fields.username}
                                        onChange={handleChange}
                                        isInvalid={ !!form.errors.username }
                                    />
                                    {
                                        form.errors.username ?
                                            <Form.Control.Feedback type={"invalid"}>
                                                {form.errors.username}
                                            </Form.Control.Feedback>
                                            :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        name={"email"}
                                        placeholder={"Enter your email"}
                                        value={form.fields.email}
                                        onChange={handleChange}
                                        isInvalid={ !!form.errors.email }
                                    />
                                    {
                                        form.errors.email ?
                                            <Form.Control.Feedback type={"invalid"}>
                                                {form.errors.email}
                                            </Form.Control.Feedback>
                                                :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicName"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"name"}
                                        placeholder={"Enter your name"}
                                        value={form.fields.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicLastname"}>
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"lastname"}
                                        placeholder={"Enter your lastname"}
                                        value={form.fields.lastname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        placeholder={"Enter your password"}
                                        name={"password"}
                                        value={form.fields.password}
                                        onChange={handleChange}
                                        isInvalid={ !!form.errors.password}
                                    />
                                    {
                                        form.errors.password ?
                                            <Form.Control.Feedback type={"invalid"}>
                                                {form.errors.password}
                                            </Form.Control.Feedback>
                                                :
                                            ""
                                    }
                                </Form.Group>
                                <div className={"d-flex justify-content-center"}>
                                    <Button variant={"primary"} type={"submit"} disabled={disabled}>
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p className={"text-body text-center"}>
                                <Link to={"/login"} >You already have an account ? click here !</Link>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Register;