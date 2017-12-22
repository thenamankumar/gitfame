import { combineReducers } from 'redux';
import user from './userReducer';

const stateReducer = combineReducers({
  user,
});

export default stateReducer;
