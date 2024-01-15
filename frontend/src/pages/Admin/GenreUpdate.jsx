import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateGenreMutation,
  useGetGenreDetailsQuery,
} from "../../redux/api/genreApiSlice";

const GenreUpdate = () => {
  const { id: genreId } = useParams();
  console.log(genreId);

  const [name, setName] = useState("");

  const { data: genre, isLoading, error } = useGetGenreDetailsQuery(genreId);

  const [updateGenre, { isLoading: loadingUpdate }] = useUpdateGenreMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (genre) {
      setName(genre.name);
    }
  }, [genre]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedGenre = {
      genreId,
      name,
    };

    const result = await updateGenre(updatedGenre);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Genre updated");
      navigate("/admin/genrelist");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/genrelist" className="btn btn-secondary my-2">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Genre</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};
export default GenreUpdate;
