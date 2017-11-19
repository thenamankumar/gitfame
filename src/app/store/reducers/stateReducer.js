import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './uiReducer';
import user from './userReducer';

const stateReducer = combineReducers({
  ui,
  user,
  router: routerReducer,
});

export default stateReducer;
