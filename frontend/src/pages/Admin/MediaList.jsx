import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetMediaQuery,
  useDeleteMediaMutation,
} from "../../redux/api/mediaApiSlice";

const MediaList = () => {
  const { data: media, isLoading, error, refetch } = useGetMediaQuery();

  // const [addMedia, { isLoading: loadingCreate }] = useCreateMediaMutation();

  const [deleteMedia, { isLoading: loadingDelete }] = useDeleteMediaMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this media type?")) {
      try {
        await deleteMedia(id);
        toast.success("Media type deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // const addMediaHandler = async () => {
  //   if (window.confirm("Are you sure you want to add this media type?")) {
  //     try {
  //       await addMedia();
  //       refetch();
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  return (
    <div className="propertyList">
      <Row className="align-items-center">
        <Col>
          <h1>Media Types</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addmedia">
            <FaEdit /> Add Media Type
          </Link>
        </Col>
      </Row>

      {/* {loadingCreate && <Loader />} */}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table=sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {media.map((media) => (
                <tr key={media._id}>
                  <td>{media._id}</td>
                  <td>{media.name}</td>
                  <td>
                    <LinkContainer to={`/admin/media/${media._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(media._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
export default MediaList;
