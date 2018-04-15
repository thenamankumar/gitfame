import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { TiGroup } from 'react-icons/lib/ti';

const Analytics = ({ user }) => (
  <React.Fragment>
    <Grid>
      <Row className="content user-header">
        <Col xs={12} sm={12} md={6} className="user-bio">
          <img src={user.avatar_url} alt={`Github user ${user.login} pic`} className="user-pic" />
          <div className="user-details">
            <p className="user-name">{user.login}</p>
            <p className="bio">{user.bio}</p>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} className="user-info">
          <div className="info">
            <p className="row value-icon-row">
              <span className="value">{user.followers}</span>
              <TiGroup className="info-icon" />
            </p>
            <p className="name-row">Followers</p>
          </div>
        </Col>
      </Row>
    </Grid>
  </React.Fragment>
);

export default Analytics;
