const report = (state = { user: {}, cache: [] }, action) => {
  switch (action.type) {
    case 'addUser':
      return {
        ...state,
        user: action.data,
      };
    case 'addUserCache':
      return {
        ...state,
        cache: [...state.cache, action.data],
      };
    default:
      return state;
  }
};

export default report;
