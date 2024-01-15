import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import PaginateGenre from "../../components/PaginateGenre";
import { toast } from "react-toastify";
import {
  useGetGenreQuery,
  useDeleteGenreMutation,
} from "../../redux/api/genreApiSlice";

const GenreList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetGenreQuery({
    pageNumber,
  });

  const [deleteGenre, { isLoading: loadingDelete }] = useDeleteGenreMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      try {
        await deleteGenre(id);
        toast.success("Genre deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="propertyList">
      <Row className="align-items-center">
        <Col>
          <h1>Genre</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addgenre">
            <FaEdit /> Add Genre
          </Link>
        </Col>
      </Row>

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
              {data.genre.map((genre) => (
                <tr key={genre._id}>
                  <td>{genre._id}</td>
                  <td>{genre.name}</td>
                  <td>
                    <LinkContainer to={`/admin/genre/${genre._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(genre._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateGenre pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};
export default GenreList;
