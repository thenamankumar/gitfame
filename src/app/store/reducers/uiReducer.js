const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case 'setSearchState': {
      const newState = Object.assign({}, state);
      newState.searchState = action.state;
      return newState;
    }
    default:
      return state;
  }
};

export default uiReducer;
