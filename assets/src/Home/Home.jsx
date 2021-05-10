import * as React from "react";
import {Container, Row, Col, Button, Jumbotron} from "react-bootstrap";
import {getUsers} from "../../api/ApiGames";
import DataService from "../../api/Auth/DataService";

const Home = ({user}) => {

    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        if(user) {
            getGames(user.token);
        }
    }, []);

    const getGames = (token) => {
        getUsers(DataService.API_URL, DataService.tokenHeader(token))
            .then(result => {
                setData(result.data);
                setLoaded(true);
            })
            .catch(error => {
                setError(error.message);
                setLoaded(true);
            })
        ;
    }

    return (
        <Container className="py-lg-md d-flex">
            <Row>
                <Jumbotron>
                    {user ? <h1>Hello {user.data.user} !</h1> : <h1> Hello World !</h1> }
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