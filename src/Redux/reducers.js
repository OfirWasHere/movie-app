import { combineReducers } from 'redux';
import { AUTH_REQUEST, GET_MOVIE_LIST } from "./actionTypes";

const initialAuthState = {
  data: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'AUTH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialMovieState = {
  data: null,
  loading: false,
  error: null
};

export const movieReducer = (state = initialMovieState, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST:
      return { ...state, loading: true };
    case 'MOVIE_LIST_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'MOVIE_LIST_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer
});

