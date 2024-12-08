import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { genreListRequest } from "../Redux/actions";

const Filters = ({
  search,
  filter,
  onSearch,
  onFilterSelect,
  handleNavButtonClick,
}) => {
  const dispatch = useDispatch();
  const { data: genres, loading, error } = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(genreListRequest());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    event.preventDefault();
    onFilterSelect(event.target.value);
  };

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
      <Toolbar
        sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}
      >
        <Typography variant="h6" sx={{ flexShrink: 0, color: "#fff" }}>
          Movie Explorer
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button
            onClick={() => handleNavButtonClick("Popular")}
            variant="contained"
            color="secondary"
          >
            Popular Movies
          </Button>
          <Button
            onClick={() => handleNavButtonClick("Airing")}
            variant="contained"
            color="secondary"
          >
            Airing Now
          </Button>
          <Button
            onClick={() => handleNavButtonClick("Favorites")}
            variant="contained"
            color="secondary"
          >
            My Favorites
          </Button>
        </Box>

        <TextField
          label="Search Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          size="small"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            minWidth: 300,
          }}
        />

        <FormControl
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            minWidth: 200,
          }}
        >
          <InputLabel>Filter by Genre</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filter by Genre"
          >
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : error ? (
              <MenuItem disabled>Error: {error}</MenuItem>
            ) : genres?.length > 0 ? (
              genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No genres available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Filters;
