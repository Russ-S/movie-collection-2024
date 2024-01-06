import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`}>
      <section className="card">
        <div className="card-details">
          <section className="card-title">{movie.title}</section>
          <section className="card-year">
            <div>Year: {movie.year}</div>
            <div>Rating: {movie.rating}</div>
          </section>
          <div className="cardFooter">
            <div className="bg-warning d-flex justify-content-between px-2">
              <span className="pull-left">
                <strong>{movie.media}</strong>
              </span>
              <span className="pull-right">
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
