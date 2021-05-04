import * as React from "react";
import {Container, Row, Col, Button, Jumbotron} from "react-bootstrap";
import {getUsers} from "../../api/ApiGames";
import {API_URL, tokenHeader} from "../../api/Auth/DataService";

const Home = () => {

    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        getGames();
    }, []);

    const getGames = () => {
        getUsers(API_URL, tokenHeader("foo"))
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
            <Row>
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
            </Row>
            <Row>
                <Col>
                    <ul>
                        { data.map(game => (
                            <li key={game.id}>{ game.name }</li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>

    )
}

export default Home;