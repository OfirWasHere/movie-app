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
    return <div className="container mx-auto px-4 py-8">Loading authentication...</div>;
  }

  if (authError) {
    return <div className="container mx-auto px-4 py-8">Error: {authError}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Movie App</h1>
      {auth ? (
        <MovieList />
      ) : (
        <div>Authentication failed. Please try again.</div>
      )}
    </div>
  );
}

export default Layout;

