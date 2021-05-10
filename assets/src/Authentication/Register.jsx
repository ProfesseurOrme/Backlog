import React from "react";
import {Button, Card, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import AlertDefault from "../Assets/AlertDefault";
import AuthService from "../../api/Auth/AuthService";
import DataService from "../../api/Auth/DataService";

const Register = () => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [name, setName] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    let history = useHistory();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username : username,
            email : email,
            name: name,
            lastname: lastname,
            password : password
        }

        const submit = AuthService.register(DataService.API_URL, data)
            .then(result => {
                setError("");
                history.push("/");
            })
            .catch(error => {
                setError(error);
            })
    }

    const validation = () => {

    }

    return (
        <>
            <Card>
                <Card.Header as="h5">Register</Card.Header>
                <Card.Body>
                    { error ? <AlertDefault message={error} variant={'danger'} /> : "" }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicFirstname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your firstname"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your lastname"
                                value={lastname}
                                onChange={(event) => setLastname(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter an email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter a password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Register;