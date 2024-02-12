import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieItem from "../components/MovieItem";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
  });

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
      });
    }

    const fetchMovies = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/movies/result?${searchQuery}`);
      const data = await res.json();
      if (data.length > 11) {
        setShowMore(true);
      }
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfMovies = movies.length;
    const startIndex = numberOfMovies;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/movies/result?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setMovies([...movies, ...data]);
  };

  return (
    <div className="searchResults">
      <form onSubmit={handleSubmit}>
        <div className="flex align-items-center justify-content-between">
          <label className="me-4 fw-semibold">Search Term:</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search movies..."
            className="searchBox p-1"
            value={sidebardata.searchTerm}
            onChange={handleChange}
          />
          <button className="btn btn-secondary">Search</button>
        </div>
      </form>
      <h4 className="fw-semibold p-2">Search Results</h4>
      <div className="row p-4 mx-auto flex flex-wrap gap-4">
        {!loading && movies.length === 0 && (
          <h4 className="fw-semibold text-center">No movies found!</h4>
        )}
        {loading && <h4 className="fw-semibold text-center">Loading...</h4>}
        {!loading &&
          movies &&
          movies.map((movie) => (
            <MovieItem key={movie._id} movie={movie} />
          ))}{" "}
        {showMore && (
          <button onClick={onShowMoreClick} className="btn showMore">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
export default Search;
