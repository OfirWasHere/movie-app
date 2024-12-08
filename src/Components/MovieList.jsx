import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieListRequest } from "../Redux/actions";
import { Box, Typography } from "@mui/material";

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
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (filter) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(Number(filter))
        );
      }

      setFilteredMovies(filtered);
    }
  }, [search, filter, movies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box>
        <>
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <Box key={movie.id}>
                  <Typography>{movie.title}</Typography>
                  <Typography>{movie.release_date}</Typography>
                  <Typography>{movie.overview}</Typography>
                  <Typography>{movie.poster_path}</Typography>
                  <Typography>{movie.vote_average} out of 10</Typography>
                </Box>
              ))
            : "No movies to be found, please try again"}
        </>
      </Box>
    </Box>
  );
}

export default MovieList;
