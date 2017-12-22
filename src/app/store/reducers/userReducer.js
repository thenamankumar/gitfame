const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'setUserData':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
