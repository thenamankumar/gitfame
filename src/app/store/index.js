import { createStore } from 'redux';
import stateReducer from './reducers/stateReducer';

const initialState = {
  ui: {
    showAnalytics: false,
    searchCollapse: false,
  },
  user: {},
};
const store = createStore(stateReducer, initialState);
export default store;
