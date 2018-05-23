import { createApolloFetch } from 'apollo-fetch';

const latestUsersPayload = () => ({
  query: `
    query {
      latestUsers {
        bio
        followers
        issues
        name
        pic
        pullRequests {
          title
        }
        repos {
          name
        }
        url
        username
      }
    }
  `,
  variables: {},
});

const fetchLatestUsersData = async () => {
  try {
    const fetch = createApolloFetch({ uri: process.env.API_BASE });

    const res = await fetch(latestUsersPayload());
    if ((res.data || {}).latestUsers) {
      return {
        ...res.data.latestUsers,
      };
    }
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  } catch (e) {
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
};

export default fetchLatestUsersData;
