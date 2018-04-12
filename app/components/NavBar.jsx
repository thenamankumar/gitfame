import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { TiArrowRight } from 'react-icons/lib/ti/';

import Animate from './Animate';

const NavBar = ({ match: { params: { username } } }) => {
  const logo = <div className="logo-text animated">GITFAME</div>;
  const menu = (
    <ul className="menu animated">
      <a href="https://github.com/hereisnaman/gitfame/" target="_blank" rel="noreferrer noopener" className="item">
        GitHub
      </a>
    </ul>
  );
  const backBox = (
    <Link as="div" to="/" className="logo-text animated">
      {username}
      <TiArrowRight className="back-icon" />
    </Link>
  );

  return (
    <Grid className="nav-bar">
      <Row>
        <Col xs={12} sm={12}>
          <Animate
            transitionName={{
              appear: 'fadeInLeft',
              enter: 'fadeInLeft',
              leave: 'fadeOutLeft',
            }}
            show={!username}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            {logo}
            {menu}
          </Animate>
          <Animate
            transitionName={{
              appear: 'fadeInRight',
              enter: 'fadeInRight',
              leave: 'fadeOutRight',
            }}
            show={username || false}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            <div />
            {backBox}
          </Animate>
        </Col>
      </Row>
    </Grid>
  );
};

export default withRouter(NavBar);
