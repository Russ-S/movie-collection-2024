import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateMediaMutation,
  useGetMediaDetailsQuery,
} from "../../redux/api/mediaApiSlice";

const MediaUpdate = () => {
  const { id: mediaId } = useParams();

  const [name, setName] = useState("");

  const { data: media, isLoading, error } = useGetMediaDetailsQuery(mediaId);

  const [updateMedia, { isLoading: loadingUpdate }] = useUpdateMediaMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (media) {
      setName(media.name);
    }
  }, [media]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedMedia = {
      mediaId,
      name,
    };

    const result = await updateMedia(updatedMedia);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Media type updated");
      navigate("/admin/medialist");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/medialist" className="btn btn-secondary my-2">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Media Type</h1>
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
export default MediaUpdate;
