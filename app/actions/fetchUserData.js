const fetchUserData = async username => {
  const res = await fetch(process.env.API_BASE + username, {
    method: 'GET',
  });

  if (res.ok) {
    return res.json();
  }

  return {
    status: 500,
    message: 'Internal Server Error',
  };
};

export default fetchUserData;
