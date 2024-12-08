import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieListRequest } from "../Redux/actions";
import { Box, Typography } from "@mui/material";
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box display={"flex"} overflow={"none"} sx={{ gap: 2, p: 2 }}>
        <>
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <Box width={400} height={"auto"} key={movie.id}>
                  <MovieCard
                    title={movie.title}
                    release_date={movie.release_date}
                    overview={movie.overview}
                    posterImage={movie.poster_path}
                    vote_average={movie.vote_average}
                  ></MovieCard>
                </Box>
              ))
            : "No movies to be found, please try again"}
        </>
      </Box>
    </Box>
  );
}

export default MovieList;
