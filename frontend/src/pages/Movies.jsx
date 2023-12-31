import { Row, Col } from "react-bootstrap";
import movies from "../movies";

const Movies = () => {
  return (
    <>
      <h1>Movies</h1>
      <Row>
        {movies.map((movie) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3 className="text-white">{movie.title}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Movies;
