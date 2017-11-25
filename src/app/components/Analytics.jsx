import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import Loader from './Loader';
import { findUser } from '../logic';

const updateLoadMsg = (msg) => {
  const ele = document.getElementById('load-msg');
  const state = ele.getAttribute('class');
  let wait = 1000;
  if (state.split(' ').indexOf('fadeOutDown') >= 0) {
    setTimeout(() => {
      ele.setAttribute('class', 'animated fadeOutDown');
    }, wait + 500);
    wait += 1500;
  } else { ele.setAttribute('class', 'animated fadeOutDown'); }
  setTimeout(() => {
    ele.innerHTML = msg;
    ele.setAttribute('class', 'animated fadeInDown');
  }, wait);
};

class Analytics extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    if (this.props.analyticsState === 1) {
      setTimeout(this.process(), 1000);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      return true;
    } else if (this.props.searchState !== nextProps.searchState) {
      return true;
    } else if (this.props.analyticsState !== nextProps.analyticsState) {
      return true;
    } else if (this.props.user !== nextProps.user) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.analyticsState === 1) {
      updateLoadMsg('Search the User');
      setTimeout(this.process(), 3000);
    }
  }

  process() {
    const { username } = this.props.match.params;
    findUser(username)
      .then((response) => {
        if (response) {
          updateLoadMsg('Analyzing your Contributions');
        } else {
          updateLoadMsg('User not found!');
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.props.analyticsState === 1) {
      return (
        <div className="analytics-wrapper">
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <h2 id="load-msg" className="animated fadeInDown">Search the User</h2>
            <Loader />
          </Col>
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  searchState: state.ui.searchState,
  analyticsState: state.ui.analyticsState,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setAnalyticsState: (state) => {
    dispatch({
      type: 'setAnalyticsState',
      state,
    });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
