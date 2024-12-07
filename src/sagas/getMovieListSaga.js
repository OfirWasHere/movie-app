import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_MOVIE_LIST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE } from '../Redux/actionTypes';

function* getMovieList() {
  try {
    const response = yield call(fetch, 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });

    const data = yield response.json();

    yield put({ type: MOVIE_LIST_SUCCESS, payload: data.results });

  } catch (error) {
    console.log(error);
    yield put({ type: MOVIE_LIST_FAILURE, payload: error.message });
  }
}

export function* watchGetMovieList() {
  yield takeLatest(GET_MOVIE_LIST, getMovieList);
}

