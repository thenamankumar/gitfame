import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Animate from '../components/Animate';
import RecCurveThree from '../assets/svg/RecCurveThree.svg';

const Analytics = ({ user }) => (
  <React.Fragment>
    <Grid>
      <Row className="content">
        <Col xs={12} sm={12} md={6} className="user-bio">
          <img src={user.avatar_url} alt={`Github user ${user.login} pic`} className="user-pic" />
          <div className="user-details">
            <p className="user-name">{user.login}</p>
            <p className="bio">{user.bio}</p>
          </div>
        </Col>
      </Row>
    </Grid>
  </React.Fragment>
);

export default Analytics;
