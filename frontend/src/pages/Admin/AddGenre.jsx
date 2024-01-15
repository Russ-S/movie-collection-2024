import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateGenreMutation } from "../../redux/api/genreApiSlice";

const AddGenre = () => {
  const [name, setName] = useState("");
  const [createGenre] = useCreateGenreMutation();
  const navigate = useNavigate();

  const addGenreHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
    navigate("/admin/genrelist");
  };

  return (
    <FormContainer>
      <div className="registerForm">
        <Link className="btn btn-secondary my-3" to="/admin/genrelist">
          Go Back
        </Link>

        <h1>Add Genre</h1>

        <Form onSubmit={addGenreHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="mt-2">
            Add Genre
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};
export default AddGenre;
