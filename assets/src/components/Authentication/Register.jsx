import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../helpers/AuthService";
import {urlBacklogApi} from "../../helpers/UrlBacklogService";
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
        },
        token: true
    });

    const [disabled, setDisabled] = useState(true);
    const [trans, i18n] = useTranslation();

    let history = useHistory();

    useEffect(() => {
        if((form.fields.username && form.fields.email && form.fields.name && form.fields.lastname && form.fields.password && form.token) && (!form.errors.username && !form.errors.email && !form.errors.name && !form.errors.lastname && !form.errors.password)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[form.fields.username,form.fields.email,form.fields.name,form.fields.lastname,form.fields.password,form.errors.username,form.errors.email,form.errors.name,form.errors.lastname,form.errors.password, form.token])


    const testUsername = {
        regex : /^[0-9a-zA-Z]{4,}$/,
        error: trans("main.register.errors.username")
    }

    const testEmail = {
        regex : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        error : trans("main.register.errors.email")
    };

    const testPassword = {
        regex : /^[0-9a-zA-Z]{8,}$/,
        error: trans("main.register.errors.password")
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        AuthService.register(i18n.language, form.fields)
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
            const searchUsername = await getUser(i18n.language, {username : value})
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

    /*
    const handleToken = (token) => {
        setForm((prevState ) => {
            return {...prevState, token: true}
        });
    }
    */

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
                            <Card.Title>{trans("main.title")}</Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className={"justify-content-md-center flex-grow-1"}>
                <Col lg={6} md={8} sm={12}>
                    <Card className={"my-3"}>
                        <Card.Header>
                            <Card.Text>{trans("main.register.title")}</Card.Text>
                        </Card.Header>
                        <Card.Body className={"p-4"}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={"mb-3"} controlId={"formBasicUsername"}>
                                    <Form.Label>{trans("main.register.inputs.username_label")}</Form.Label>
                                    <Form.Control
                                        type={"username"}
                                        name={"username"}
                                        placeholder={trans("main.register.inputs.username_placeholder")}
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
                                    <Form.Label>{trans("main.register.inputs.email_label")}</Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        name={"email"}
                                        placeholder={trans("main.register.inputs.email_placeholder")}
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
                                    <Form.Label>{trans("main.register.inputs.name_label")}</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"name"}
                                        placeholder={trans("main.register.inputs.name_placeholder")}
                                        value={form.fields.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicLastname"}>
                                    <Form.Label>{trans("main.register.inputs.lastname_label")}</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"lastname"}
                                        placeholder={trans("main.register.inputs.lastname_placeholder")}
                                        value={form.fields.lastname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                                    <Form.Label>{trans("main.register.inputs.password_label")}</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        placeholder={trans("main.register.inputs.password_placeholder")}
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
                                <div className={"d-flex justify-content-center my-2"}>
                                    {/*
                                    <ReCaptchaV2
                                        sitekey={process.env.SITE_KEY_CAPTCHA}
                                        onChange={handleToken}
                                    />
                                    */}
                                </div>
                                <div className={"d-flex justify-content-center"}>
                                    <Button variant={"primary"} type={"submit"} disabled={disabled}>
                                        {trans("main.register.inputs.submit")}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p className={"text-body text-center"}>
                                <Link to={"/login"} >{trans("main.login.inputs.account")}</Link>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Register;