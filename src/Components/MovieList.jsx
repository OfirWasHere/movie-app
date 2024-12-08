import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieListRequest } from "../Redux/actions";
import { Box, Typography, Grid } from "@mui/material";
import MovieCard from "./MovieCard";

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

  if (loading) return <Box sx={{ p: 2 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 2 }}>Error: {error}</Box>;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                title={movie.title}
                release_date={movie.release_date}
                overview={movie.overview}
                posterImage={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No movies found, please try again</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default MovieList;

