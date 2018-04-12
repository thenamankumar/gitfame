import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import fetchUserData from '../actions/fetchUserData';
import generateReport from '../actions/generateReport';
import compareStringLower from '../utils/compareStringLower';
import Animate from '../components/Animate';

class Report extends React.Component {
  async componentDidMount() {
    return this.loadData(this.props);
  }

  async componentDidUpdate() {
    const { match: { params: { username } }, user } = this.props;
    // load data only if search changed
    if (!compareStringLower(user.login, username)) return this.loadData(this.props);
  }

  loadData = async ({ match: { params: { username } }, cache, addUser, addUserCache, setLoading }) => {
    // check if cache report is latest
    const checkReportCache = report => report && new Date(report.time) - new Date() <= 24 * 60 * 60 * 1000;

    // fetch new data if cache  not latest
    const fetchLatest = async search => {
      setLoading(true);
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
    const { match: { params: { username } }, loading, user } = this.props;
    const showLoading = (loading && username) || false;
    const showReport = (!loading && username) || false;

    return (
      <React.Fragment>
        <Grid className="layer">
          <Row className="content">
            <Col xs={12} sm={12}>
              <Animate
                transitionName={{
                  appear: 'fadeIn',
                  enter: 'fadeIn',
                  leave: 'fadeOutRight',
                }}
                show={showLoading}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                <h2 key="report-loading" className="animated">
                  Fetching User Data
                </h2>
              </Animate>
            </Col>
          </Row>
        </Grid>
        <Grid className="layer">
          <Row className="content">
            <Col xs={12} sm={12}>
              <Animate
                transitionName={{
                  appear: 'fadeIn',
                  enter: 'fadeIn',
                  leave: 'fadeOutRight',
                }}
                show={showReport}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                <h1 key="report-loading" className="animated">
                  second
                </h1>
              </Animate>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  user: store.report.user,
  cache: store.report.cache,
  loading: store.report.loading,
});

const mapDispatchToProps = dispatch => ({
  setLoading: data => {
    dispatch({
      type: 'setLoading',
      data,
    });
  },
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
