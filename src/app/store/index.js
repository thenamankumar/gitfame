import { createStore } from 'redux';
import stateReducer from './reducers/stateReducer';

const initialState = {
  ui: {
    showAnalytics: false,
    searchState: 2, // 2: Show Full 1: Collapse 0: Hide
  },
  user: {
    username: '',
  },
};
const store = createStore(stateReducer, initialState);
export default store;
