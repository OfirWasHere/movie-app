import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { genreListRequest } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Filters({ search, filter, onSearch, onFilterSelect }) {
  const dispatch = useDispatch();
  const { data: genres, loading, error } = useSelector((state) => state.genres);

  const handleFilterChange = (event) => {
    onFilterSelect(event.target.value);
  };

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
    console.log(genres);
    
  };

  useEffect(() => {
    dispatch(genreListRequest());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FormControl fullWidth>
        <Box
          pt={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          gap={2}
          m={2}
        >
          <TextField
            label="Search..."
            variant="filled"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            sx={{ maxWidth: 400 }}
          />

          <FormControl variant="filled" sx={{ minWidth: 160 }}>
            <InputLabel>Filter by</InputLabel>
            <Select
              label="Filter"
              value={filter}
              onChange={handleFilterChange}
              fullWidth
            >
            </Select>
          </FormControl>
        </Box>
      </FormControl>
    </div>
  );
}

export default Filters;
