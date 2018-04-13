import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Animate from '../components/Animate';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';

const Analytics = ({ user }) => (
  <React.Fragment>
    <Animate name="slideInLeft" timeout={1000}>
      <img key="RecCurveOne-home-1" src={RecCurveOne} alt="background" className="home-rec-one animated" />
    </Animate>
    <Grid>
      <Row className="content">
        <Col xs={12} sm={12} md={4} className="header" />
      </Row>
    </Grid>
  </React.Fragment>
);

export default Analytics;
