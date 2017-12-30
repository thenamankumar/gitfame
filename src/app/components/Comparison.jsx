import React from 'react';
import FetchUserDataPromise from '../logics/FetchUserDataPromise';

class Comparison extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  process() {
    Promise.all([
      FetchUserDataPromise(this.props.match.params.username1),
      FetchUserDataPromise(this.props.match.params.username2),
    ])
      .then((responses) => {
        console.log(responses[0]);
        console.log(responses[1]);
      });
  }

  render() {
    this.process();
    return (
      <div>Hello!</div>
    );
  }
}

export default Comparison;
