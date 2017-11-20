import { combineReducers } from 'redux';
import ui from './uiReducer';
import user from './userReducer';

const stateReducer = combineReducers({
  ui,
  user,
});

export default stateReducer;
