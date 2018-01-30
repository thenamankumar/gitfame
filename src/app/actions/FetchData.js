const fetchData = (username, fresh) => fetch(
  process.env.API_URL,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${username}&fresh=${fresh}`,
  },
).then((response) => {
  if (response.ok) {
    return response.text();
  }
  throw new Error('Request Failed');
}).catch(console.log);

export default fetchData;
