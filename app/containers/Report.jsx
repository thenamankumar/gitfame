import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import fetchUserData from '../actions/fetchUserData';
import generateReport from '../actions/generateReport';
import compareStringLower from '../utils/compareStringLower';
import ReportLoading from '../components/ReportLoading';
import Analytics from '../components/Analytics';
import ErrorPage from '../components/ErrorPage';

class Report extends React.Component {
  async componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search, null, this.props.match.params.username);
    }
    return this.loadData(this.props);
  }

  async componentDidUpdate() {
    const { match: { params: { username } }, user } = this.props;
    // load data only if search changed
    if (!compareStringLower(user.login, username)) {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.pageview(window.location.pathname + window.location.search, null, this.props.match.params.username);
      }
      return this.loadData(this.props);
    }
  }

  componentWillUnmount() {
    const { resetUser } = this.props;

    resetUser();
  }

  loadData = async (
    { match: { params: { username } }, cache, setUpdating, addUser, addUserCache, resetUser },
    fresh,
  ) => {
    // fetch latest
    const fetchLatest = async search => {
      if (fresh) {
        setUpdating(true);
      } else {
        resetUser();
      }
      const data = await fetchUserData(search, fresh);

      // generate report if user data found
      return data.status === 200 ? generateReport(data) : data;
    };

    // find user report in cache
    const reportCache = () => cache.find(({ login }) => login === username);

    // fetch new data if cache report not latest
    const report = fresh ? await fetchLatest(username) : reportCache() || (await fetchLatest(username));

    if (window.location.pathname.split('/')[2] === username) {
      // dispatch action if current search is same
      if (fresh) {
        if (report.status === 200) {
          addUser(report);
        }
      } else {
        addUser(report);
      }
    } else if (report.status === 200) {
      // add user report to cache if search is changed
      addUserCache(report);
    }
  };

  render() {
    const { loading, updating, user, match: { params: { username } } } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{username} Github Contribution Analysis | GitFame</title>
          <meta name="description" content={`${username} Github contribution analysis performed using Gitfame.`} />
          <meta property="og:title" content={`${username} Github Contribution Analysis | GitFame`} />
          <meta property="og:url" content={window.location.origin + window.location.pathname} />
        </Helmet>
        {loading && <ReportLoading />}
        {!loading &&
          user.status === 200 && (
            <React.Fragment>
              {new Date() - new Date(user.time) > 24 * 60 * 60 * 1000 && (
                <section className="slim">
                  <Grid className="update-bar">
                    <Col xs={12} sm={12} className="card-wrap">
                      <div className="card shadow">
                        <Row className="slim">
                          <Col xs={12} sm={12} md={8} className="text-center-sm">
                            <h4 className="message italic under">
                              The data was last fetched on{' '}
                              <span
                                style={{
                                  color: '#ef4e7b',
                                }}>
                                {user.time
                                  .split('T')[0]
                                  .split('-')
                                  .reverse()
                                  .join('-')}
                              </span>, you can generate an updated report.
                            </h4>
                          </Col>
                          <Col xs={12} sm={12} md={4} className="text-right text-center-sm">
                            <button
                              className="btn-dark update-btn"
                              onClick={e => {
                                e.preventDefault();
                                this.loadData(this.props, true);
                              }}>
                              {!updating && 'Update Now'}
                              {updating && (
                                <div className="loading-msg">
                                  <div className="lds-ring">
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                  </div>
                                </div>
                              )}
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Grid>
                </section>
              )}
              <Analytics user={user} />
            </React.Fragment>
          )}
        {!loading && user.status !== 200 && <ErrorPage data={user} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  user: store.report.user,
  cache: store.report.cache,
  loading: store.report.loading,
  updating: store.report.updating,
});

const mapDispatchToProps = dispatch => ({
  setUpdating: data => {
    dispatch({
      type: 'setUpdating',
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
  resetUser: () => {
    dispatch({
      type: 'resetUser',
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));
