import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { beersReducer } from './apiReducer';
import { rootWatcher } from '../saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  beersReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWatcher)
