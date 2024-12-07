import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../Redux/actions";
import MovieList from "./MovieList";

function Layout() {
  const dispatch = useDispatch();
  const { data: auth, loading: authLoading, error: authError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authRequest());
  }, [dispatch]);

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (authError) {
    return <div>Error: {authError}</div>;
  }

  return (
    <div>
      <h1>Movie App</h1>
      {auth ? (
        <MovieList />
      ) : (
        <div>Authentication failed. Please try again.</div>
      )}
    </div>
  );
}

export default Layout;

