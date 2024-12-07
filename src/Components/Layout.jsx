import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../Redux/actions";
import MovieList from "./MovieList";
import { Box } from "@mui/material";
import Filters from "./Filters";

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
    <div>
      <Box>
        <>
          <Filters
            search={search}
            filter={filter}
            onSearch={handleOnSearch}
            onFilterSelect={handleOnFilterSelect}
          />
          {auth ? (
            <MovieList filter={filter} search={search} />
          ) : (
            <div>Authentication failed. Please try again.</div>
          )}
        </>
      </Box>
    </div>
  );
}

export default Layout;
