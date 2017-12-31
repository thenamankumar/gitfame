import React from 'react';
import { Col } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/lib/fa';
import FetchUserDataPromise from '../logics/FetchUserDataPromise';
import Loader from './Loader';
import UserInfo from './analytics/UserInfo';

class Comparison extends React.Component {
  constructor() {
    super();
    this.state = {
      dataReq: 'fetching',
      user1: null,
      user2: null,
    };
    this.process = this.process.bind(this);
  }
  componentDidMount() {
    this.process();
  }
  componentDidUpdate() {
    this.process();
  }

  process() {
    if (this.state.dataReq === 'fetching') {
      Promise.all([
        FetchUserDataPromise(this.props.match.params.username1),
        FetchUserDataPromise(this.props.match.params.username2),
      ])
        .then((responses) => {
          console.log(0, responses[0]);
          console.log(0, responses[1]);
          // this.setState({
          //   user1: responses[0],
          //   user2: responses[1],
          //   dataReq: 'successful',
          // });
          // console.log(1, this.state.user1);
          // console.log(1, this.state.user2);
        })
        .then((responses) => {
          console.log(0, responses[0]);
          console.log(0, responses[1]);
        })
        .catch((err) => {
          this.setState({ dataReq: 'unsuccessful' });
          console.log(err);
        });
    }
  }

  render() {
    console.log('Render Comparison');
    if (this.state.dataReq === 'fetching') {
      return (
        <div className="analytics-wrapper">
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <h2 id="load-msg" className="animated fadeInDown">Fetching Data</h2>
            <Loader />
          </Col>
        </div>
      );
    } else if (this.state.dataReq === 'unsuccessful') {
      return (
        <div className="analytics-wrapper">
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <FaExclamationCircle className="icon-not-found animated fadeIn" />
            <h2 id="load-msg" className="animated fadeInDown">User Not Found!</h2>
          </Col>
        </div>
      );
    } else if (this.state.dataReq === 'successful') {
      console.log(2, this.state.user1);
      console.log(2, this.state.user2);
      return (
        <div>
          <Col sm={6} md={5} className="offset-md-1 analytics-wrapper">
            <UserInfo data={this.state.user1} />
          </Col>
          <Col sm={6} md={5} className="offset-md-1 analytics-wrapper">
            <UserInfo data={this.state.user2} />
          </Col>
        </div>
      );
    }
    return (<div />);
  }
}

export default Comparison;
