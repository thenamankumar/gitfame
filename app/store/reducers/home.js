const home = (state = { latestUsers: [] }, action) => {
  switch (action.type) {
    case 'getLatestUsers':
      return {
        ...state,
        latestUsers: action.data,
      };
    default:
      return state;
  }
};

export default home;
