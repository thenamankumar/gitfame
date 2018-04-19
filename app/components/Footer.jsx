import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { TiHeart } from 'react-icons/lib/ti';

const Footer = () => (
  <Grid className="footer">
    <Row className="center">
      <p>
        Made with <TiHeart className="heart" /> by{' '}
        <a href="https://github.com/hereisnaman" target="_blank" rel="noreferrer noopener">
          Naman Kumar
        </a>
      </p>
    </Row>
  </Grid>
);

export default Footer;
