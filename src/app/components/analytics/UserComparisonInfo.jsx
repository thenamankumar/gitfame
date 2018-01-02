import React from 'react';
import { Col } from 'react-bootstrap';
import { FaUser, FaClockO } from 'react-icons/lib/fa';

const createdAt = (data) => {
  const date = new Date(data);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

class UserInfo extends React.Component {
  render() {
    const user = this.props.data;
    return (
      <div className="row">
        <Col sm={12} md={4} className="stats-card">
          <div className="front  profile-info">
            <div className="profile-pic-wrap">
              <img className="profile-pic" src={user.avatar_url} alt={`Github User ${user.login}`} />
            </div>
            <div className="profile-details">
              <h3 className="username">@{user.login}</h3>
              <p className="bio">{user.bio}</p>
              <table className="details">
                <tbody>
                  <tr>
                    <td className="field"><FaUser /> Followers</td>
                    <td>:</td>
                    <td className="value">{user.followers}</td>
                  </tr>
                  <tr>
                    <td className="field"><FaUser /> Following</td>
                    <td>:</td>
                    <td className="value">{user.following}</td>
                  </tr>
                  <tr>
                    <td className="field"><FaClockO /> User Since</td>
                    <td>:</td>
                    <td className="value">{createdAt(user.createdAt)}</td>
                  </tr>
                </tbody>
              </table>
              <a href={user.html_url} target="_blank" className="btn">View Profile</a>
            </div>
          </div>
        </Col>
        <Col sm={12} md={8} className="stats-card">
          <div className="front  profile-info">
            <div className="heading">GitFame Score:</div>
            <div className="row score-row">
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value grad">{user.score.work + user.score.consistency}</h1>
                  <span className="sub">/60</span>
                </p>
                <p className="score-name">Contributions</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value grad">{user.score.stars}</h1>
                  <span className="sub">/20</span>
                </p>
                <p className="score-name">Stars</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value grad">{user.score.forks}</h1>
                  <span className="sub">/20</span>
                </p>
                <p className="score-name">Forks</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value grad">{user.score.total}</h1>
                  <span className="sub">/100</span>
                </p>
                <p className="score-name">Total Score</p>
              </Col>
            </div>
            <div className="heading">Repos Stats:</div>
            <div className="row score-row">
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.stars}</h1>
                </p>
                <p className="score-name">Stars</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.forks}</h1>
                </p>
                <p className="score-name">Forks</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.watchers}</h1>
                </p>
                <p className="score-name">Watchers</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.own_repos}</h1>
                </p>
                <p className="score-name">Repos Owned</p>
              </Col>
            </div>
            <div className="heading">All Time Stats:</div>
            <div className="row score-row">
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.commits}</h1>
                </p>
                <p className="score-name">Commits</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.commitsPerDay}</h1>
                </p>
                <p className="score-name">Avg Commits/Day</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.public_repos}</h1>
                </p>
                <p className="score-name">Public Repos</p>
              </Col>
              <Col xs={6} sm={6} md={3} className="score-box">
                <p className="score">
                  <h1 className="score-value">{user.languages[0].name}</h1>
                </p>
                <p className="score-name">Top Language</p>
              </Col>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default UserInfo;
