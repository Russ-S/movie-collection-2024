import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import axios from "axios";

const Movie = () => {
  const [movie, setMovie] = useState({});

  const { id: movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`/api/movies/${movieId}`);
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="movieDetail">
      <Link className="btn btn-secondary my-3" to="/movies">
        Go Back
      </Link>

      <>
        <Row>
          <Col lg={3} md={12} className="text-center">
            <Image
              src={movie.image}
              alt={movie.title}
              fluid
              style={{
                border: "1px solid #000",
                width: "200px",
                height: "310px",
              }}
              className="mt-0"
            />
          </Col>
          <Col md={9}>
            <div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{movie.title}</h3>
                  <h4>{movie.cast}</h4>
                  <h5>{movie.year}</h5>
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div>
              <Row>
                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>
                        <strong>Director: </strong> {movie.director}
                      </h6>
                      <h6>
                        <strong>Writer(s): </strong> {movie.writer}
                      </h6>
                      <h6>
                        <strong>Genre: </strong> {movie.genre}
                      </h6>
                      <h6>
                        <strong>Location: </strong> {movie.location}
                      </h6>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>
                        <strong>Media: </strong> {movie.media}
                      </h6>
                      <h6>
                        <strong>Rating: </strong> {movie.rating}
                      </h6>
                      <h6>
                        <strong>Duration: </strong> {movie.duration}
                      </h6>
                      <h6>
                        <strong>Value: </strong> ${movie.value}
                      </h6>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup>
              <ListGroup.Item>
                <h6>
                  <strong>Description: </strong> {movie.description}
                </h6>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    </div>
  );
};
export default Movie;
