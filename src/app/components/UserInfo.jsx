import React from 'react';
import { Col } from 'react-bootstrap';
import { FaUser, FaCodeFork, FaClockO } from 'react-icons/lib/fa';

const createdAt = (data) => {
  const date = new Date(data);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

class UserInfo extends React.Component {
  render() {
    const user = this.props.data;
    return (
      <div className="row">
        <Col sm={12} md={4} className="stats-card" >
          <div className="front  profile-info">
            <div className="profile-pic-wrap">
              <img className="profile-pic" src={user.avatar_url} alt={`Github User ${user.login}`} />
            </div>
            <div className="profile-details">
              <h3 className="username">@{user.login}</h3>
              <p className="bio">{user.bio}</p>
              <table className="details">
                <tr>
                  <td className="field"><FaUser /> Followers</td>
                  <td>:</td>
                  <td className="value">{user.followers}</td>
                </tr>
                <tr>
                  <td className="field"><FaCodeFork /> Public Repos</td>
                  <td>:</td>
                  <td className="value">{user.public_repos}</td>
                </tr>
                <tr>
                  <td className="field"><FaClockO /> User Since</td>
                  <td>:</td>
                  <td className="value">{createdAt(user.createdAt)}</td>
                </tr>
              </table>
              <a href={user.html_url} target="_blank" className="btn">View Profile</a>
            </div>
          </div>
        </Col>
        <Col sm={12} md={8} className="stats-card" >
          <div className="front  profile-info" />
        </Col>
      </div>
    );
  }
}

export default UserInfo;
