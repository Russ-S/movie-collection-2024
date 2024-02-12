import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`}>
      <section className="card">
        <div className="card-details">
          <section className="card-title">{movie.title}</section>
          <section className="card-year">
            <div className="d-flex justify-content-between">
              <span>Year: {movie.year}</span>
              <span>Rating: {movie.rating}</span>
            </div>
          </section>
          <div className="cardFooter">
            <div className="bg-warning d-flex justify-content-between px-2">
              <span>
                <strong>{movie.media}</strong>
              </span>
              <span>
                <strong>{movie.genre}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};
export default MovieCard;
