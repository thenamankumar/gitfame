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
        cache: [...state.cache.filter(cacheReport => cacheReport.login !== action.data.login), action.data],
      };
    case 'addUserCache':
      return {
        ...state,
        cache: [...state.cache.filter(cacheReport => cacheReport.login !== action.data.login), action.data],
      };
    case 'resetUser':
      return {
        ...state,
        loading: true,
        user: {},
      };
    default:
      return state;
  }
};

export default report;
