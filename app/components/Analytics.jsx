import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Analytics = ({ user }) => (
  <React.Fragment>
    <Grid>
      <Row className="content user-header">
        <Col xs={12} sm={12} md={6} className="user-bio">
          <div className="user-pic-box">
            <div className="user-pic-bg">
              <img src={user.avatar_url} alt={`Github user ${user.login} pic`} className="user-pic" />
            </div>
          </div>
          <div className="user-details">
            <h2 className="user-name">{user.login}</h2>
            <p className="bio">{user.bio}</p>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} className="user-info">
          <div className="info">
            <h2 className="value">{user.followers}</h2>
            <p className="name">Followers</p>
          </div>
        </Col>
      </Row>
    </Grid>
  </React.Fragment>
);

export default Analytics;
