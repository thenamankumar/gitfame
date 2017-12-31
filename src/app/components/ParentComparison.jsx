import React from 'react';
import { Row } from 'react-bootstrap';
import ChildComparison from './ChildComparison';

class ParentComparison extends React.Component {
  /*
  process() {
    if (this.state.dataReq === 'fetching') {
      FetchData(this.props.match.params.username1, true)
        .then((response) => {
          const data = JSON.parse(response);
          if (data.success) {
            return data;
          }
          throw new Error('User not found');
        })
        .then(data => GenerateStats(data))
        .then((data) => {
          this.setState({
            user1: data,
            dataReq: 'successful',
          });
          console.log(data);
        })
        .catch((err) => {
          this.setState({ dataReq: 'unsuccessful' });
          console.log(err);
        });
    }
  }
  */

  render() {
    console.log('Render Main Comparison View');
    return (
      <Row>
        <ChildComparison userid={this.props.match.params.username1} />
        <ChildComparison userid={this.props.match.params.username2} />
      </Row>
    );
  }
}

export default ParentComparison;
