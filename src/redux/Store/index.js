import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import MovieReducer from '../Reducers';

const Reducers = {
  appData: MovieReducer,
};

export const store = createStore(
  combineReducers(Reducers),
  applyMiddleware(thunk),
);
