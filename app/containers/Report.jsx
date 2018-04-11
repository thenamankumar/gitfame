import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchUserData from '../actions/fetchUserData';
import generateReport from '../actions/generateReport';
import compareStringLower from '../utils/compareStringLower';

class Report extends React.Component {
  async componentDidMount() {
    return this.loadData(this.props);
  }

  async componentDidUpdate() {
    const { match: { params: { username } }, user } = this.props;
    // load data only if search changed
    if (!compareStringLower(user.login, username)) return this.loadData(this.props);
  }

  loadData = async ({ match: { params: { username } }, cache, addUser, addUserCache }) => {
    // check if cache report is latest
    const checkReportCache = report => report && new Date(report.time) - new Date() <= 24 * 60 * 60 * 1000;

    // fetch new data if cache  not latest
    const fetchLatest = async search => {
      const data = await fetchUserData(search);

      // generate report if user data found
      return data.status === 200 ? generateReport(data) : data;
    };

    // find user report in cache
    const reportCache = cache.find(({ login }) => login === username);

    // fetch new data if cache report not latest
    const report = checkReportCache(reportCache) ? reportCache : await fetchLatest(username);

    if (window.location.pathname.split('/')[1] === username) {
      // dispatch action if current search is same
      addUser(report);
    } else if (report.status === 200) {
      // add user report to cache if search is changed
      addUserCache(report);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Do you want to impress your clients?</h1>
        <h2>Do you want to impress your clients?</h2>
        <h3>Hello</h3>
        <p>
          Do you want to impress your clients? Do you want to impress your clients? Do you want to impress your clients?
        </p>
        Hello
        <button>Search</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.report.user,
  cache: store.report.cache,
});

const mapDispatchToProps = dispatch => ({
  addUser: data => {
    dispatch({
      type: 'addUser',
      data,
    });
  },
  addUserCache: data => {
    dispatch({
      type: 'addUserCache',
      data,
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));
