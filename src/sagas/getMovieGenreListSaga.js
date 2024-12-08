import { call, put, takeLatest } from "redux-saga/effects"
import { FETCH_GENRE_LIST, FETCH_GENRE_SUCCESS, FETCH_GENRE_FAILURE } from "../Redux/actionTypes";

function* getGenreList() {
    try {
        const response = yield call(fetch, 'https://api.themoviedb.org/3/genre/movie/list', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
        })

        const data = yield response.json()

        
        yield put({ type: FETCH_GENRE_SUCCESS, payload: data.genres });
        

    } catch (error) {
        console.log(error)
        yield put({ type: FETCH_GENRE_FAILURE, payload: error.message });
    }
}

export function* watchGetGenreList() {
    yield takeLatest(FETCH_GENRE_LIST, getGenreList)
}