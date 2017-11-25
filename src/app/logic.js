function findUser(username) {
  const query = `{user(login:"${username}"){login}}`;

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GIT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.text())
    .then((response) => {
      const data = JSON.parse(response);
      return !data.errors;
    });
}

export { findUser };

