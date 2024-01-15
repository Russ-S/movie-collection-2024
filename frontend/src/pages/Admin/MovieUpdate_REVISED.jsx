import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useFetchGenreQuery } from "../../redux/api/genreApiSlice";
import {
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetMovieByIdQuery,
} from "../../redux/api/movieApiSlice";
import { toast } from "react-toastify";

const MovieUpdate = () => {
  const { data: genrelist, isLoading, error } = useFetchGenreQuery();

  const params = useParams();

  const { data: movieData } = useGetMovieByIdQuery(params._id);

  const [title, setTitle] = useState(movieData?.title || "");
  const [image, setImage] = useState(movieData?.image || "");
  const [director, setDirector] = useState(movieData?.director || "");
  const [writer, setWriter] = useState(movieData?.writer || "");
  const [cast, setCast] = useState(movieData?.cast || "");
  const [year, setYear] = useState(movieData?.year || "");
  const [duration, setDuration] = useState(movieData?.duration || "");
  const [media, setMedia] = useState(movieData?.media || "");
  const [genre, setGenre] = useState(movieData?.genre || "");
  const [rating, setRating] = useState(movieData?.rating || "");
  const [value, setValue] = useState(movieData?.value || "");
  const [description, setDescription] = useState(movieData?.description || "");
  const [location, setLocation] = useState(movieData?.location || "");

  const navigate = useNavigate();

  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    if (movieData && movieData._id) {
      setTitle(movieData.title);
      setImage(movieData.image);
      setDirector(movieData.director);
      setWriter(movieData.writer);
      setCast(movieData.cast);
      setYear(movieData.year);
      setDuration(movieData.duration);
      setMedia(movieData.media);
      setGenre(movieData.genre);
      setRating(movieData.rating);
      setValue(movieData.value);
      setDescription(movieData.description);
      setLocation(movieData.location);
    }
  }, [movieData]);

  return (
    <div className="propertyList">
      <Link to="/admin/movielist" className="btn btn-secondary my-2">
        Go Back
      </Link>

      <h4>Update Movie</h4>

      {/* {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( */}
      <Form
      // onSubmit={addMovieHandler}
      >
        <Row>
          <Col md={9}>
            <Form.Group controlId="title" className="my-2">
              <div className="formRow">
                <Form.Label className="labelTop fw-bold">Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="image" className="my-2">
              <div className="formRow">
                <Form.Label className="labelTop fw-bold">Image:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3} sm={3}>
            <Form.Group controlId="director" className="my-2">
              <div className="formRow">
                <Form.Label className="labelTop fw-bold">Director:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter director"
                  required
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={3} sm={3}>
            <Form.Group controlId="writer" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">
                  Writer(s):
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter writer(s)"
                  required
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={1} sm={2}>
            <Form.Group controlId="year" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Year:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter year"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={1} sm={2}>
            <Form.Group controlId="duration" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Duration:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter duration"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col md={1} sm={2}>
            <Form.Group controlId="media" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Media:</Form.Label>
                <Form.Select
                  type="text"
                  required
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                >
                  <option>Select Type</option>
                  <option value="DVD">DVD</option>
                  <option value="Blu-Ray">Blu-Ray</option>
                  <option value="DVD-R">DVD-R</option>
                  <option value="VHS">VHS</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>

          <Col md={1} sm={2}>
            <Form.Group controlId="genre" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Genre:</Form.Label>
                <Form.Select
                  type="text"
                  required
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option>Select One</option>
                  {/* {genrelist.map((g) => (
                    <option key={g._id} value={g.name}>
                      {g.name}
                    </option>
                  ))} */}
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col md={1} sm={2}>
            <Form.Group controlId="rating" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Rating:</Form.Label>
                <Form.Select
                  type="text"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option>Select One</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="NC-17">NC-17</option>
                  <option value="R">R</option>
                  <option value="Not Rated">Not Rated</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col md={1} sm={2}>
            <Form.Group controlId="value" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Value:</Form.Label> $
                <Form.Control
                  type="text"
                  placeholder="Enter value"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <Form.Group controlId="cast" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Cast:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cast"
                  required
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="location" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">Location:</Form.Label>
                <Form.Select
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>Select One</option>
                  <option value="Cortez, CO">Cortez, CO</option>
                  <option value="Fallston, MD">Fallston, MD</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col s={12}>
            <Form.Group controlId="description" className="my-2">
              <div className="formRow">
                <Form.Label className="labelName fw-bold">
                  Description:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="dark" className="my-2">
          Update Movie
        </Button>
      </Form>
      {/* )} */}
    </div>
  );
};
export default MovieUpdate;
