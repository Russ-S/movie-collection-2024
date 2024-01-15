import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredMoviesQuery } from "../../redux/api/movieApiSlice";
import { useFetchMediaQuery } from "../../redux/api/mediaApiSlice";
import ReactPaginate from "react-paginate";

import { setMedia, setMovies, setChecked } from "../../redux/movies/movieSlice";

import MovieCard from "../../components/MovieCard";

const Movies = () => {
  const dispatch = useDispatch();

  const { media, movies, checked, radio } = useSelector(
    (state) => state.movies
  );

  const mediaQuery = useFetchMediaQuery();

  const filteredMoviesQuery = useGetFilteredMoviesQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!mediaQuery.isLoading) {
      dispatch(setMedia(mediaQuery.data));
    }
    // eslint-disable-next-line
  }, [mediaQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredMoviesQuery.isLoading) {
        // Filter movies based on checked media
        const filteredMedia = filteredMoviesQuery.data.filter((movie) => {
          return movie.media;
        });

        dispatch(setMovies(filteredMedia));
      }
    }
    // eslint-disable-next-line
  }, [checked, radio, filteredMoviesQuery.data, dispatch]);

  const handleGenreClick = (genre) => {
    const moviesByGenre = filteredMoviesQuery.data?.filter(
      (movie) => movie.genre === genre
    );

    dispatch(setMovies(moviesByGenre));
  };

  const handleCheck = (value, name) => {
    const updatedChecked = value
      ? [...checked, name]
      : checked.filter((m) => m !== name);
    dispatch(setChecked(updatedChecked));
  };

  //  "All Genre" option to uniqueGenre
  const uniqueGenre = [
    ...Array.from(
      new Set(
        filteredMoviesQuery.data
          ?.map((movie) => movie.genre)
          .filter((genre) => genre !== undefined)
      )
    ),
  ].sort();

  // for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 8;
  const pagesVisited = pageNumber * moviesPerPage;

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="row">
        <div className="sidebar">
          <h6 className="fw-semibold">Filter By Media</h6>

          <div className="pl-5 mb-4">
            {media
              ?.slice(pagesVisited, pagesVisited + moviesPerPage)
              .map((m) => (
                <div key={m._id} className="ms-3 mb-2 text-white">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, m.name)}
                      className="pl-5"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ms-2 text-sm font-medium text-white"
                    >
                      {m.name}
                    </label>
                  </div>
                </div>
              ))}
          </div>

          <h6 className="fw-semibold">Filter By Genre</h6>

          <div className="ml-5 mb-4">
            {uniqueGenre?.map((genre) => (
              <>
                <div className="flex items-center ms-3 mb-1">
                  <input
                    type="radio"
                    id={genre}
                    name="brand"
                    onChange={() => handleGenreClick(genre)}
                    className="pl-5"
                  />
                  <label htmlFor="pink-radio" className="ms-2">
                    {genre}
                  </label>
                </div>
              </>
            ))}
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary fw-bold"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="movieList">
          <h4>{movies?.length} Movies</h4>

          <div className="card-container">
            {movies.length === 0 ? (
              <h3>No movies found</h3>
            ) : (
              movies
                .slice(pagesVisited, pagesVisited + moviesPerPage)
                .map((movie) => (
                  <div key={movie._id}>
                    <MovieCard movie={movie} />
                  </div>
                ))
            )}
          </div>

          <ReactPaginate
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};
export default Movies;
