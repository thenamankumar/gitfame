const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'updateUser': { const newState = state;
      newState.username = action.username;
      return newState; }
    default:
      return state;
  }
};

export default userReducer;
