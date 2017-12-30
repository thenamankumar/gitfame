import React from 'react';
import FetchData from '../logics/FetchData';
import GenerateStats from '../logics/GenerateStats';

class Comparison extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  process() {
    const fetchPromise = (username) => {
      FetchData(username, true)
        .then((response) => {
          const data = JSON.parse(response);
          if (data.success) {
            return data;
          }
          throw new Error('User not found');
        })
        .then(data => GenerateStats(data))
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    Promise.all([
      fetchPromise(this.props.match.params.username1),
      fetchPromise(this.props.match.params.username2),
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
