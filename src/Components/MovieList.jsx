import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieListRequest } from "../Redux/actions";

function MovieList({ search, filter }) {
  const dispatch = useDispatch();

  const { data: movies, loading, error } = useSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    dispatch(movieListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (movies) {
      let filtered = movies;
      
      if (search) {
        setFilteredMovies(
          filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
        );
        // if(filter){
        //   // todo add genre fitler
        // }
      }
      setFilteredMovies(filtered);
    }
  }, [search, filter, movies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <>
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <div key={movie.id}>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>{movie.overview}</p>
                </div>
              ))
            : "no movies to be found"}
        </>
      </div>
    </div>
  );
}

export default MovieList;
