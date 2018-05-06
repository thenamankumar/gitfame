import { createApolloFetch } from 'apollo-fetch';

const userPayload = (username, fresh) => ({
  query: `
    query($username: String!, $fresh: Boolean) {
      user(username: $username, fresh: $fresh) {
        bio
        followers
        following
        name
        pic
        profileCreatedAt
        repos {
          branch
          forks
          fullName
          isFork
          languages {
            name
            color
          }
          size
          stars
          url
          userCommits
          watchers
        }
        status
        time
        uid
        url
        username
      }
    }
  `,
  variables: {
    username,
    fresh: !!fresh,
  },
});

const fetchUserData = async (username, fresh) => {
  try {
    const fetch = createApolloFetch({ uri: process.env.API_BASE });

    const res = await fetch(userPayload(username, fresh));
    if ((res.data || {}).user) {
      return {
        ...res.data.user,
      };
    }
    return {
      status: 500,
      message: 'Internal Server Error',
      username,
    };
  } catch (e) {
    return {
      status: 500,
      message: 'Internal Server Error',
      username,
    };
  }
};

export default fetchUserData;
