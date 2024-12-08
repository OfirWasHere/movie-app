import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_AIR_NOW_LIST, FETCH_AIR_NOW_SUCCESS, FETCH_AIR_NOW_FAILURE } from '../Redux/actionTypes';

function* getMovieThatAirNow() {
  try {
    const response = yield call(fetch, 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });

    const data = yield response.json();

    yield put({ type: FETCH_AIR_NOW_SUCCESS, payload: data.results });

  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_AIR_NOW_FAILURE, payload: error.message });
  }
}

export function* watchMoviesThatAirNowList() {
  yield takeLatest(FETCH_AIR_NOW_LIST, getMovieThatAirNow);
}

