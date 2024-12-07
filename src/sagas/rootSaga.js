import { all } from 'redux-saga/effects';
import { watchAuthRequest } from './getAuthTokenSaga';
import { watchGetMovieList } from './getMovieListSaga';
import { watchGetGenreList } from './getMovieGenreListSaga';

export default function* rootSaga() {
  yield all([
    watchAuthRequest(),
    watchGetMovieList(),
    watchGetGenreList()
  ]);
}

