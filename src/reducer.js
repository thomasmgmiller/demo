import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import app from './App/reducer';

const reducer = combineReducers({ app });
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(state) {
  const store = createStore(
    (state, action) => reducer(state, action),
    state,
    composeEnhancer(applyMiddleware(thunk))
  );

  return store;
}
