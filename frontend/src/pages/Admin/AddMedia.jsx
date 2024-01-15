import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateMediaMutation } from "../../redux/api/mediaApiSlice";

const AddMedia = () => {
  const [name, setName] = useState("");
  const [createMedia] = useCreateMediaMutation();
  const navigate = useNavigate();

  const addMediaHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Media name is required");
      return;
    }

    try {
      const result = await createMedia({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating media type failed, try again.");
    }
    navigate("/admin/medialist");
  };

  return (
    <FormContainer>
      <div className="registerForm">
        <Link className="btn btn-secondary my-3" to="/admin/medialist">
          Go Back
        </Link>

        <h1>Add Media</h1>

        <Form onSubmit={addMediaHandler}>
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
            Add Media
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};
export default AddMedia;
