import { Row, Col } from "react-bootstrap";
import movies from "../movies";
import Movie from "../components/Movie";

const Movies = () => {
  return (
    <>
      <h1 className="text-white">Movies</h1>
      <Row>
        {movies.map((movie) => (
          <Col key={movies._id} sm={12} md={6} lg={4} xl={3}>
            <Movie movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Movies;
