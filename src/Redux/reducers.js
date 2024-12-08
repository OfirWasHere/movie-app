import { combineReducers } from 'redux';
import {
  AUTH_REQUEST, GET_MOVIE_LIST,
  AUTH_SUCCESS, AUTH_FAILURE,
  MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE,
  FETCH_GENRE_SUCCESS, FETCH_GENRE_LIST,
  FETCH_GENRE_FAILURE
} from "./actionTypes";

const initialAuthState = {
  data: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case AUTH_FAILURE:
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
    case MOVIE_LIST_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case MOVIE_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialGenreState = {
  data: [],
  loading: false,
  error: null
}

export const genreReducer = (state = initialGenreState, action) => {
  switch (action.type) {
    case FETCH_GENRE_LIST:
      return { ...state, loading: true }
    case FETCH_GENRE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_GENRE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}


const initialAirNowState = {
  data: [],
  loading: false,
  error: null
}

export const airNowReducer = (state = initialAirNowState, action) => {
  switch (action.type) {
    case FETCH_GENRE_LIST:
      return { ...state, loading: true }
    case FETCH_GENRE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_GENRE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}
export const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  genres: genreReducer,
  airNow: airNowReducer,
});

