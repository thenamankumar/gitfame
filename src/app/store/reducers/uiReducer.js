const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case 'collapseSearch': {
      console.log('collapsing');
      const newState = Object.assign({}, state);
      newState.collapse = true;
      console.log(newState === state);
      return newState;
    }
    case 'expandSearch': {
      const newState = state;
      newState.collapse = false;
      return newState;
    }
    default:
      return state;
  }
};

export default uiReducer;
