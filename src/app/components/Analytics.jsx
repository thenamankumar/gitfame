import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/lib/fa';
import Loader from './Loader';
import FetchData from '../logics/FetchData';
import GenerateStats from '../logics/GenerateStats';
import UserInfo from './analytics/UserInfo';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReq: 'fetching',
    };
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    this.process();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.setState({ dataReq: 'fetching' });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.dataReq !== nextState.dataReq) {
      return true;
    }
    return this.props.match.params.username !== nextProps.match.params.username;
  }

  componentDidUpdate() {
    this.process();
  }

  process() {
    if (this.state.dataReq === 'fetching') {
      FetchData(this.props.match.params.username, true)
        .then((response) => {
          const data = JSON.parse(response);
          if (data.success) {
            return data;
          }
          throw new Error('User not found');
        })
        .then(data => GenerateStats(data))
        .then((data) => {
          this.props.setUserData(data);
          this.setState({ dataReq: 'successful' });
        })
        .catch((err) => {
          this.setState({ dataReq: 'unsuccessful' });
          console.log(err);
        });
    }
  }

  render() {
    console.log('Render Analytics');
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
      return (
        <Col className="col-xl-10 offset-xl-1 analytics-wrapper">
          <UserInfo data={this.props.userData} />
        </Col>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = store => ({
  userData: store.user,
});

const mapDispatchToProps = dispatch => ({
  setUserData: (data) => {
    dispatch({
      type: 'setUserData',
      data,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
