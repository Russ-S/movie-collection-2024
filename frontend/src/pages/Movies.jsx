import { useEffect, useState } from "react";
// import movies from "../movies";
import axios from "axios";

// import {
//   setMedia,
//   setRecordings,
//   setChecked,
// } from "../../redux/recordings/recordingSlice";

import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get("/api/movies");
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="row">
        <div className="sidebar">
          <h6 className="fw-semibold">Filter By Media</h6>

          <div className="pl-5 mb-4">
            {/* {media?.map((m) => (
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
            ))} */}
          </div>

          <h6 className="fw-semibold">Filter By Genre</h6>

          <div className="ml-5 mb-4">
            {/* {uniqueCategories?.map((workCategory) => (
                <>
                  <div className="flex items-center ms-3 mb-1">
                    <input
                      type="radio"
                      id={workCategory}
                      name="brand"
                      onChange={() => handleCategoryClick(workCategory)}
                      className="pl-5"
                    />
                    <label htmlFor="pink-radio" className="ms-2">
                      {workCategory}
                    </label>
                  </div>
                </>
              ))} */}
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
              movies.map((movie) => (
                <div key={movie._id}>
                  <MovieCard movie={movie} />
                </div>
              ))
            )}
          </div>

          {/* <ReactPaginate
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
          /> */}
        </div>
      </div>
    </>
  );
};
export default Movies;
