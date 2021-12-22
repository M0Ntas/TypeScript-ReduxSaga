import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_BEERS, getBeers } from '../store/apiReducer';

const fetchBeersApi = () => fetch('https://api.punkapi.com/v2/beers')

function* fetchUserWorker(): object {
  const data = yield call(fetchBeersApi)
  const json = yield call(() => new Promise(res => res(data.json())))
  yield put(getBeers(json))
}

export function* beersWatcher() {
  yield takeEvery(FETCH_BEERS, fetchUserWorker)
}