import { createStore } from 'redux';
import stateReducer from './reducers/stateReducer';

const initialState = {
  ui: {
    showAnalytics: false,
    searchState: window.location.pathname === '/' ? 2 : 1, // 2: Show Full 1: Collapse
  },
  user: {
    username: '',
  },
};
const store = createStore(stateReducer, initialState);
export default store;
