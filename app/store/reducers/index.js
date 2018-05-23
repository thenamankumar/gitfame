import { combineReducers } from 'redux';
import report from './report';
import home from './home';

const Reducer = combineReducers({
  // add reducers here
  report,
  home,
});

export default Reducer;
