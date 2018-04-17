import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { FaExclamation } from 'react-icons/lib/fa';
import Animate from './Animate';

const ErrorPage = ({ data }) => (
  <Animate name="fadeIn" timeout={1000}>
    <Grid className="animated">
      <section className="error-section">
        <Row xs={12} sm={12} className="content center">
          <Col xs={12} sm={12} md={6} className="text-center">
            <div className="error-icon">
              <FaExclamation />
            </div>
            <h2>{data.status === 404 ? 'User not found!' : 'There was some error!'}</h2>
          </Col>
        </Row>
      </section>
    </Grid>
  </Animate>
);

export default ErrorPage;
