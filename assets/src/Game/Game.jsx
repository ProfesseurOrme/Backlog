import * as React from "react";
import {Button, Col, Form, Container, FormControl, InputGroup, Jumbotron, Row, Table, Accordion} from "react-bootstrap";
import GameList from "./GameList";
import axios from "axios";
import {apiKey} from "../../api/config";


const Game = () => {

    const [search, setSearch] = React.useState("");
    const [games, setGames] = React.useState(null);
    const [nbResults, setNbResults] = React.useState(0);
    const [error, setError] = React.useState("");
    const [loaded, setLoaded] = React.useState();

    const handleSearch = async (event) => {
        event.preventDefault();
        let slug = search.split(' ').join('-').toLowerCase();
        if(search.length > 3) {
            axios.get("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + slug +"&search_exact=true&exclude_additions=true")
                .then(result => {
                    console.log(result);
                    setNbResults(result.data.count);
                    setGames(result.data.results);
                })
                .catch(error => {
                    setError(error.message);
                })
            ;
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Jumbotron>
                        <h1> Search your game !</h1>
                        <p>
                            Please enter the name of the game and choose it from the proposed list.
                        </p>
                        <Form onSubmit={handleSearch}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Search a game"
                                    aria-label="Search a game"
                                    aria-describedby="search-a-game"
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" type="submit">Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Jumbotron>
                </Row>
            </Container>
            {games ?
                <Container>
                    { (nbResults > 0) ? <h1>There is {nbResults} result(s) !</h1> : <h1>No result ! Repeat your search</h1> }
                    <Row>
                        <Col>
                            <Accordion>

                                {games.map(game => (game.added_by_status) ? <GameList key={game.id} game={game} /> : null )}
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
                : "" }

        </>
    )
}

export default Game;