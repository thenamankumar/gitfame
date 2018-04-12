const report = (state = { loading: true, user: {}, cache: [] }, action) => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: action.data,
      };
    case 'addUser':
      return {
        ...state,
        loading: true,
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
