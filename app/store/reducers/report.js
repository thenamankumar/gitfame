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
        loading: false,
        user: action.data,
      };
    case 'resetUser':
      return {
        ...state,
        user: {},
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
