import React from 'react';

const createdAt = (data) => {
  const date = new Date(data);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

class UserComparisonInfo extends React.Component {
  render() {
    const user = this.props.data;
    return (
      <table style={{ color: 'white' }}>
        <thead>
          <tr>
            <td>
              <img width={300} src={user.avatar_url} alt={`Github User ${user.login}`} />
            </td>
          </tr>
          <tr>
            <td>
              @{user.login}
            </td>
          </tr>
          <tr>
            <td>
              {user.bio}
            </td>
          </tr>
          <tr>
            <td>
              {createdAt(user.createdAt)}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Followers: {user.followers}
            </td>
          </tr>
          <tr>
            <td>
              Following: {user.following}
            </td>
          </tr>
          <tr>
            <td>
              Commits: {user.commits}
            </td>
          </tr>
          <tr>
            <td>
              Commits/Day: {user.commitsPerDay}
            </td>
          </tr>
          <tr>
            <td>
              Forks: {user.forks}
            </td>
          </tr>
          <tr>
            <td>
              Stars: {user.stars}
            </td>
          </tr>
          <tr>
            <td>
              Watchers: {user.watchers}
            </td>
          </tr>
          <tr>
            <td>
              Total Repos: {user.repos.length}
            </td>
          </tr>
          <tr>
            <td>
              GitFame Score: {user.score.total}
            </td>
          </tr>
          <tr>
            <td>
              Top Contributions Repo: {user.topContributionsRepo.full_name}
            </td>
          </tr>
          <tr>
            <td>
              Top Stars Repo: {user.topStarsRepo.full_name}
            </td>
          </tr>
          <tr>
            <td>
              Top Forks Repo: {user.topForksRepo.full_name}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default UserComparisonInfo;
