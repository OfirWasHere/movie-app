import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieListRequest } from "../Redux/actions";

const MovieList = () => {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(movieListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies);
    }
  }, [movies]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter movies..."
        value={filter}
        onChange={handleFilterChange}
      />
      <div>
        <>
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <div key={movie.id}>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>{movie.overview.slice(0, 100)}...</p>
                </div>
              ))
            : "no movies to be found"}
        </>
      </div>
    </div>
  );
};

export default MovieList;
