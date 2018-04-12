import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import uuid from 'uuid/v1';

import Animate from '../components/Animate';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';
import RecCurveTwo from '../assets/svg/RecCurveTwo.svg';

const Home = ({ match: { params: { username } } }) => (
  <React.Fragment>
    <Animate
      transitionName={{
        appear: 'slideInLeft',
        enter: 'slideInLeft',
        leave: 'slideOutLeft',
      }}
      show={!username}
      transitionAppearTimeout={1100}
      transitionEnterTimeout={1100}
      transitionLeaveTimeout={1500}>
      <img key={uuid()} src={RecCurveOne} alt="gitfame shades" className="home-rec-one animated" />
      <img key={uuid()} src={RecCurveTwo} alt="gitfame shades" className="home-rec-two animated" />
    </Animate>
    <Grid>
      <Row className="content">
        <Col xs={12} sm={12} md={6} className="header">
          <Animate
            transitionName={{
              appear: 'fadeIn',
              enter: 'fadeIn',
              leave: 'fadeOutLeft',
            }}
            show={!username}
            transitionAppearTimeout={1600}
            transitionEnterTimeout={1600}
            transitionLeaveTimeout={1000}>
            <h1 className="title animated">
              Do You Want <br />To Analyze Your <br />GitHub Contributions?
            </h1>
          </Animate>
        </Col>
      </Row>
    </Grid>
  </React.Fragment>
);

export default withRouter(Home);
