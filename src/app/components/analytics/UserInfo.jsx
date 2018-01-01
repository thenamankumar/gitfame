import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaClockO } from 'react-icons/lib/fa';
import Donut from '../charts/Donut';

const createdAt = (data) => {
  const date = new Date(data);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

class UserInfo extends React.Component {
  render() {
    const user = this.props.data;
    return (
      <div className="row">
        <Col sm={12} md={6} lg={4} className="stats-card">
          <div className="front  profile-info">
            <div className="heading">Profile:</div>
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
        <Col sm={12} md={6} lg={4} className="stats-card">
          <div className="front  profile-info">
            <div className="heading">Score:</div>
            <div className="donut-wrap">
              <Donut score={user.score.total} total={100} />
            </div>
            <div className="row score-row">
              <Col xs={6} sm={6} className="score-box">
                <p className="score pull">
                  <h2 className="score-value">{user.score.stars}</h2>
                  <span className="sub">/20</span>
                </p>
                <p className="score-name">Stars</p>
              </Col>
              <Col xs={6} sm={6} className="score-box">
                <p className="score pull">
                  <h2 className="score-value">{user.score.forks}</h2>
                  <span className="sub">/20</span>
                </p>
                <p className="score-name">Forks</p>
              </Col>
            </div>
            <div className="row score-row">
              <Col xs={6} sm={6} className="score-box">
                <p className="score pull">
                  <h2 className="score-value">{user.score.work}</h2>
                  <span className="sub">/30</span>
                </p>
                <p className="score-name">Contributions</p>
              </Col>
              <Col xs={6} sm={6} className="score-box">
                <p className="score pull">
                  <h2 className="score-value">{user.score.consistency}</h2>
                  <span className="sub">/30</span>
                </p>
                <p className="score-name">Consistency</p>
              </Col>
            </div>
          </div>
        </Col>
        <Col sm={12} md={6} lg={4} className="stats-card">
          <div className="front  profile-info">
            <div className="heading">Stats:</div>
            <p className="description">These are the all time stats. Learn about <Link to="/how"><span className="font-italic">how they are calculated</span></Link>.</p>
            <div className="row score-row">
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value">{user.commits}</h2>
                </p>
                <p className="score-name">Commits</p>
              </Col>
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value">{user.stars}</h2>
                </p>
                <p className="score-name">Stars</p>
              </Col>
            </div>
            <div className="row score-row">
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value">{user.forks}</h2>
                </p>
                <p className="score-name">Forks</p>
              </Col>
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value">{user.watchers}</h2>
                </p>
                <p className="score-name">Watchers</p>
              </Col>
            </div>
            <div className="row score-row">
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value">{user.public_repos}</h2>
                </p>
                <p className="score-name">Public Repos</p>
              </Col>
              <Col xs={6} sm={6} className="score-box">
                <p className="score">
                  <h2 className="score-value" style={{ color: user.languages[0].color }}>{user.languages[0].name}</h2>
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
