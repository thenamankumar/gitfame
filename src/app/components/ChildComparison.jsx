import React from 'react';
import { Col } from 'react-bootstrap';

class ChildComparison extends React.Component {
  render() {
    return (
      <div>
        <Col sm={12} md={6}>
          <h2>{this.props.userid}</h2>
        </Col>
      </div>
    );
  }
}

export default ChildComparison;
