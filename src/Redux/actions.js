import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, GET_MOVIE_LIST, FETCH_GENRE_LIST } from "./actionTypes";

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authSuccess = (data) => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error,
});

export const movieListRequest = () => ({
  type: GET_MOVIE_LIST,
});

export const genreListRequest = () => ({
  type: FETCH_GENRE_LIST,
})
