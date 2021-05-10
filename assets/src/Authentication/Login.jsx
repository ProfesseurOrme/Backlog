import React from "react";
import {useHistory} from "react-router-dom";
import { Button, Card, Form} from "react-bootstrap";
import AlertDefault from "../Assets/AlertDefault";
import AuthService from "../../api/Auth/AuthService";
import DataService from "../../api/Auth/DataService";

const Login = ({setUser}) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username : username,
            password : password
        }

        const loginResult = AuthService.login(DataService.API_URL, data)
            .then(result => {
                setError("");
                setUser(result);
                history.push("/");
            }).catch(error => {
                setError(error);
            })
        ;

    }

    return (
        <Card>
            <Card.Header as="h5">Enter your credentials</Card.Header>
            <Card.Body>
                { error ? <AlertDefault message={error} variant={'danger'} /> : "" }
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
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
    )
}

export default Login;