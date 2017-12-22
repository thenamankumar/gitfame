import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import Loader from './Loader';
import { fetchData } from '../logic';

const generateStats = data => data;

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReq: 'pending',
    };
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    this.process();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.setState({ dataReq: 'pending' });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state, 'should', nextState);
    if (this.state.dataReq !== nextState.dataReq) {
      return true;
    }
    return this.props.match.params.username !== nextProps.match.params.username;
  }

  componentDidUpdate() {
    this.process();
  }

  process() {
    if (this.state.dataReq === 'pending') {
      this.setState({ dataReq: 'fetching' });
      fetchData(this.props.match.params.username, true)
        .then((response) => {
          const data = JSON.parse(response);
          if (data.success) {
            return data;
          }
          throw new Error('User not found');
        })
        .then(response => generateStats(response))
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
    console.log('Analytics render');
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
            <h2 id="load-msg" className="animated fadeInDown">User Not Found!</h2>
          </Col>
        </div>
      );
    } else if (this.state.dataReq === 'successful') {
      return (
        <div className="analytics-wrapper">
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <h2 id="load-msg" className="animated fadeInDown">User Found!</h2>
          </Col>
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = store => ({
  user: store.user,
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
