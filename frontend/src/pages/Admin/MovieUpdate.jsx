import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateMovieMutation,
  useGetMovieDetailsQuery,
} from "../../redux/api/movieApiSlice";

const MovieUpdate = () => {
  const { id: movieId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [cast, setCast] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [media, setMedia] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(movieId);

  const [updateMovie, { isLoading: loadingUpdate }] = useUpdateMovieMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setImage(movie.image);
      setDirector(movie.director);
      setWriter(movie.writer);
      setCast(movie.cast);
      setYear(movie.year);
      setDuration(movie.duration);
      setMedia(movie.media);
      setGenre(movie.genre);
      setRating(movie.rating);
      setValue(movie.value.toFixed(2));
      setDescription(movie.description);
      setLocation(movie.location);
    }
  }, [movie]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedMovie = {
        movieId,
        title,
        image,
        director,
        writer,
        cast,
        year,
        duration,
        media,
        genre,
        rating,
        value,
        description,
        location,
      };

      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("director", director);
      formData.append("writer", writer);
      formData.append("cast", cast);
      formData.append("year", year);
      formData.append("duration", duration);
      formData.append("media", media);
      formData.append("genre", genre);
      formData.append("rating", rating);
      formData.append("value", value);
      formData.append("description", description);
      formData.append("location", location);

      // Update product using the RTK Query mutation
      // const data = await updateMovie({ movieId, formData });
      const data = await updateMovie(updatedMovie);
      console.log(data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Movie successfully updated`);
        navigate("/admin/movielist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Movie update failed. Try again.");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/movielist" className="btn btn-secondary my-2">
        Go Back
      </Link>

      <h4>Update Movie Details</h4>
      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={9}>
              <Form.Group controlId="title" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelTop fw-bold">Title:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
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
                  <Form.Label className="labelTop fw-bold">
                    Director:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter director"
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
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col md={1} sm={2}>
              <Form.Group controlId="duration" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName fw-bold">
                    Duration:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter duration"
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
                  <Form.Control
                    type="text"
                    placeholder="Enter media type"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={1} sm={2}>
              <Form.Group controlId="genre" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName fw-bold">Genre:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col md={1} sm={2}>
              <Form.Group controlId="rating" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName fw-bold">Rating:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter catalog number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col md={1} sm={2}>
              <Form.Group controlId="value" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName fw-bold">Value:</Form.Label>{" "}
                  $
                  <Form.Control
                    type="text"
                    placeholder="Enter value"
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
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId="location" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName fw-bold">
                    Location:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></Form.Control>
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
                    placeholder="Enter value"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="dark" className="my-2">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};
export default MovieUpdate;
