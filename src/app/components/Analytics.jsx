import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import Loader from './Loader';
import { findUser } from '../logic';

const updateLoadMsg = (msg) => {
  const ele = document.getElementById('load-msg');
  ele.setAttribute('class', 'animated fadeOutDown');
  setTimeout(() => {
    ele.innerHTML = msg;
    ele.setAttribute('class', 'animated fadeInDown');
  }, 1000);
};

class Analytics extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      if (nextProps.analyticsState === 1) { return true; }
      this.props.setAnalyticsState(1);
    } else if (this.props.analyticsState !== nextProps.analyticsState) {
      return true;
    } else if (this.props.userFound !== nextProps.userFound) {
      return true;
    } else if (this.props.user !== nextProps.user) {
      return true;
    }
    return false;
  }

  process() {
    const { username } = this.props.match.params;
    findUser(username)
      .then((response) => {
        if (response) {
          updateLoadMsg('Analyzing your Contributions');
        } else {
          this.props.setUserFound(false, 2);
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.props.analyticsState === 1) {
      setTimeout(this.process(), 1000);
      return (
        <div className="analytics-wrapper">
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <h2 id="load-msg" className="animated fadeInDown">Searching the User</h2>
            <Loader />
          </Col>
        </div>
      );
    } else
    if (this.props.analyticsState === 2) {
      if (!this.props.userFound) {
        return (
          <div className="analytics-wrapper">
            <Col sm={12} md={6} className="offset-md-3 stats-box">
              <h2 id="load-msg" className="animated fadeInDown">User Not Found!</h2>
            </Col>
          </div>
        );
      }
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  searchState: state.ui.searchState,
  analyticsState: state.ui.analyticsState,
  userFound: state.ui.userFound,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setAnalyticsState: (state) => {
    dispatch({
      type: 'setAnalyticsState',
      state,
    });
  },
  setUserFound: (status, state) => {
    dispatch({
      type: 'setUserFound',
      status,
      state,
    });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
