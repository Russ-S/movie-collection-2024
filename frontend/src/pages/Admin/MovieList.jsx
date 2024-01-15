import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import PaginateMovies from "../../components/PaginateMovies";
import { toast } from "react-toastify";
import {
  useGetMoviesQuery,
  useDeleteMovieMutation,
} from "../../redux/api/movieApiSlice";

const MovieList = () => {
  const { pageNumber } = useParams();

  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useGetMoviesQuery({
    pageNumber,
  });

  const [deleteMovie, { isLoading: loadingDelete }] = useDeleteMovieMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        toast.success("Movie deleted");
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
          <h1>Movies</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addmovie">
            <FaEdit /> Add Movie
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
                <th>TITLE</th>
                <th>GENRE</th>
                <th>MEDIA</th>
                <th>RATING</th>
                <th>YEAR</th>
                <th>LOCATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td className="text-start">{movie.title}</td>
                  <td className="text-start">{movie.genre}</td>
                  <td>{movie.media}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.year}</td>
                  <td>{movie.location}</td>
                  <td>
                    <LinkContainer to={`/admin/movie/${movie._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(movie._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateMovies
            pages={movies.pages}
            page={movies.page}
            isAdmin={true}
          />
        </>
      )}
    </div>
  );
};

export default MovieList;
