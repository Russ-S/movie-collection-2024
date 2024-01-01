import { Card, Row, Col } from "react-bootstrap";

const Movie = ({ movie }) => {
  return (
    <div>
      <Card
        className="mb-3 rounded"
        style={{ width: "300px", height: "180px" }}
      >
        <Card.Body>
          <Row>
            <Col xs={6}>
              <a href={`/movie/${movie._id}`}>
                <Card.Img
                  src={movie.image}
                  variant="top"
                  style={{ width: "100px", height: "143px" }}
                />
              </a>
            </Col>
            <Col xs={6} className="text-center">
              <Card.Title as="div">
                <div style={{ height: "75px" }}>
                  <strong>{movie.title}</strong>
                </div>

                <div className="mt-0" style={{ fontWeight: "600" }}>
                  {movie.year}
                  <p>
                    {movie.media} &#8211; {movie.rating}
                    <br />
                    {movie.genre}
                  </p>
                </div>
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Movie;
