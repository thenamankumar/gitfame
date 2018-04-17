import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { TiArrowRight } from 'react-icons/lib/ti/';

const NavBar = ({ match: { params: { username } } }) => {
  const logo = (
    <Link as="div" to="/" className="logo-text animated no-under">
      GITFAME
    </Link>
  );
  const menu = (
    <ul className="menu animated">
      <a href="https://github.com/hereisnaman/gitfame/" target="_blank" rel="noreferrer noopener" className="item">
        GitHub
      </a>
    </ul>
  );
  const backBox = (
    <Link as="div" to="/" className="back-text animated under">
      {username}
      <TiArrowRight className="back-icon" />
    </Link>
  );

  return (
    <Grid className="nav-bar">
      <Row className="animated">
        <Col xs={12} sm={12} className="box">
          {logo}
          <div className="github-star">
            <a
              className="github-button"
              href="https://github.com/hereisnaman/gitfame"
              target="_blank"
              rel="noopener noreferrer"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star hereisnaman/gitfame on GitHub">
              Star
            </a>
          </div>
          {username && backBox}
          {!username && menu}
        </Col>
      </Row>
    </Grid>
  );
};

export default withRouter(NavBar);
