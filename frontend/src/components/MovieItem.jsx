import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  return (
    <div className="searchResultCard shadow-lg">
      <Link to={`/movie/${movie._id}`}>
        <div className="text-center">
          <img
            src={`/images/${movie.image}` || "/images/no-image.jpg"}
            alt="album cover"
            style={{
              width: "100px",
              height: "155px",
              border: "1px solid #000",
            }}
          />
        </div>

        <div className="mt-2">
          <p>
            <span className="movieTitle fw-bold">{movie.title}</span>
            <br />
            <span className="movieCast">{movie.cast}</span>
          </p>
        </div>
        <div className="cardFooter">
          <div className="d-flex justify-content-between px-2">
            <p className="movieMedia fw-bold">{movie.media}</p>
            <p className="movieRating fw-bold">{movie.rating}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default MovieItem;
