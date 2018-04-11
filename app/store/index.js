import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Reducer from './reducers';

const initialState = {
  // initialize state here
  report: {
    user: {},
    cache: [],
  },
};
const store = createStore(Reducer, initialState, applyMiddleware(Thunk));

export default store;
