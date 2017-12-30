import React from 'react';
import FetchData from '../logics/FetchData';
import GenerateStats from '../logics/GenerateStats';

class Comparison extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  process() {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    FetchData(this.props.match.params.username2, true)
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
  }

  render() {
    this.process();
    return (
      <div>Hello!</div>
    );
  }
}

export default Comparison;
