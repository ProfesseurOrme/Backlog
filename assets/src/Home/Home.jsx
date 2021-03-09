import * as React from "react";
import {Container, Row, Col, Button, Jumbotron} from "react-bootstrap";
import axios from "axios";

const Home = () => {

    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get("https://127.0.0.1:8000/api/games/")
            .then(result => {
                setData(result.data);
                setLoaded(true);
            })
            .catch(error => {
                setError(error);
            })
        ;
    }

    return (
        <Container className="py-lg-md d-flex">
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </Container>

    )
}

export default Home;