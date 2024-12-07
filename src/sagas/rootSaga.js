import { all } from 'redux-saga/effects';
import { watchAuthRequest } from './getAuthTokenSaga';
import { watchGetMovieList } from './getMovieListSaga';

export default function* rootSaga() {
  yield all([
    watchAuthRequest(),
    watchGetMovieList()
  ]);
}

