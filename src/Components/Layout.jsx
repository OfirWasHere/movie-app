import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../Redux/actions";
import MovieList from "./MovieList";
import { Box } from "@mui/material";
import Filters from "./Filters";
import KeyboardNavigation from "./KeyboardNavigation";

function Layout() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(authRequest());
  }, [dispatch]);

  const handleOnSearch = (value) => {
    setSearch(value);
  };

  const handleOnFilterSelect = (filter) => {
    setFilter(filter);
  };

  return (
    <KeyboardNavigation>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Filters
            search={search}
            filter={filter}
            onSearch={handleOnSearch}
            onFilterSelect={handleOnFilterSelect}
          />
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {auth ? (
            <MovieList filter={filter} search={search} />
          ) : (
            <Box sx={{ p: 2 }}>Authentication failed. Please try again.</Box>
          )}
        </Box>
      </Box>
    </KeyboardNavigation>
  );
}

export default Layout;
