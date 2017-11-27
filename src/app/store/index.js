import { createStore } from 'redux';
import stateReducer from './reducers/stateReducer';

const initialState = {
  ui: {
    searchState: window.location.pathname === '/' ? 2 : 1, // 2: Show Full 1: Collapse
    analyticsState: 1, // 2: Complete 1: In Progress
    userFound: false,
  },
  user: {
    username: '',
  },
};
const store = createStore(stateReducer, initialState);
export default store;
