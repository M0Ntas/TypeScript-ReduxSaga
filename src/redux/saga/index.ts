import { all } from 'redux-saga/effects';
import { beersWatcher } from './beersSaga';

export function* rootWatcher() {
  yield all([beersWatcher()])
};