import React from "react";
import { Button, Card, Form} from "react-bootstrap";
import AlertDefault from "../components/AlertDefault";
import {login} from "../../api/Auth/AuthService";
import {API_URL} from "../../api/Auth/DataService";

const Login = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username : username,
            password : password
        }

        const loginResult = login(API_URL, data)
            .then(res => {
                // set action when authenticate
            }).catch(err => {
                setError(err.response.data.message);
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