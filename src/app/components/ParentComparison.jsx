import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChildComparison from './ChildComparison';

class ParentComparison extends React.Component {
  render() {
    console.log('Render Main Comparison View');
    return (
      <Row>
        <Col className="col-sm-6">
          <ChildComparison userid={this.props.match.params.username1} userData={null} />
        </Col>
        <Col className="col-sm-6">
          <ChildComparison userid={this.props.match.params.username2} userData={null} />
        </Col>
      </Row>
    );
  }
}

export default ParentComparison;
