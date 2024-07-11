import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  useEffect(() => {
    retrieveNextPage();
  }, [currentPage]);

  const retrieveNextPage = () => {
    console.log("Accepting Search Mode")
    setLoading(true);
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else {
      retrieveMovies();
    }
  };

  const retrieveMovies = () => {
    console.log("Retrieving Movies")
    setLoading(true);
    setCurrentSearchMode("");
    MovieDataService.getAll(currentPage)
      .then((response) => {
        console.log("After retrieving movies")
        console.log(response.data);
        setMovies(response.data.movies);
        
        console.log(`Values in setMovies \n ${response.data.movies}`)
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  const retrieveRatings = () => {
    console.log("Retrieving Ratings");
    setLoading(true);
    MovieDataService.getRatings()
      .then((response) => {
        console.log("After retrieving by raitings");
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  const onChangeSearchTitle = (e) => {
    
    const searchTitle = e.target.value;
    console.log(`onChangeSearchTitle triggered :${searchTitle}`);
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    
    const searchRating = e.target.value;
    console.log(`onChangeSearchRating triggered :${searchRating}`);
    setSearchRating(searchRating);
  };

  const find = async (query, by) => {
    setLoading(true);
    try {
      const response = await MovieDataService.find(query, by, currentPage);
      console.log("async find triggered")
      console.log(response.data);
      
      setMovies(response.data.movies);
      console.log(`Values in setMovies \n ${response.data.movies}`);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    console.log(`find by title 2 `);
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    console.log(`find by rating 2 `);
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => {
                    return (
                      <option value={rating} key={rating}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie) => (
              <Col key={movie._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={movie.poster + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <br />
        Showing page: {currentPage}.
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get next {entriesPerPage} results
        </Button>
      </Container>
    </div>
  );
};

export default MoviesList;
