import { createStore } from 'redux';
import stateReducer from './reducers/stateReducer';

const initialState = {
  user: {},
};
const store = createStore(stateReducer, initialState);
export default store;
