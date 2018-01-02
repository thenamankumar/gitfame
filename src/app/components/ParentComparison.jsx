import React from 'react';
import { Row } from 'react-bootstrap';
import ChildComparison from './ChildComparison';

class ParentComparison extends React.Component {
  render() {
    console.log('Render Main Comparison View');
    return (
      <Row>
        <ChildComparison userid={this.props.match.params.username1} userData={null} />
        <ChildComparison userid={this.props.match.params.username2} userData={null} />
      </Row>
    );
  }
}

export default ParentComparison;
