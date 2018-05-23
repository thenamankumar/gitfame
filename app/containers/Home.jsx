import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Animate from '../components/Animate';
import SearchCarousel from '../components/SearchCarousel';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';
import RecCurveTwo from '../assets/svg/RecCurveTwo.svg';

import fetchLatestUsers from '../actions/fetchLatestUsers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.goToReport = this.goToReport.bind(this);
  }

  state = {
    inputActive: false,
    usernameInput: '',
  };

  async componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search, null, 'Home');
    }

    const data = await fetchLatestUsers();
    if (data.status !== 500) {
      this.props.getLatestUsers(Object.values(data));
    }
  }

  handleInput = e => {
    e.preventDefault();
    const {
      current: { value },
    } = this.inputRef;

    if (!value || /^[^/ ]*$/.test(value)) {
      this.setState({
        usernameInput: value,
      });
    }
  };

  goToReport(username) {
    const { history } = this.props;
    history.push(`/user/${(username || '').toLowerCase()}`);
  }

  handleActionButton = e => {
    e.preventDefault();
    const { inputActive, usernameInput } = this.state;
    if (inputActive) {
      if (usernameInput) {
        this.goToReport(usernameInput);
        return;
      }
    }
    this.setState({
      inputActive: true,
    });
  };

  handleSubmit = e => {
    const { usernameInput } = this.state;
    if (e.keyCode === 13 && usernameInput) {
      e.preventDefault();
      this.goToReport(usernameInput);
    }
  };

  render() {
    const { inputActive, usernameInput } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>GitFame | Github Contribution Analyser</title>
          <meta
            name="description"
            content="An open source web app, Gitfame can be used to analyze your open source contributions on Github."
          />
          <meta property="og:title" content="GitFame | Github Contribution Analyser" />
          <meta property="og:url" content={window.location.origin + window.location.pathname} />
        </Helmet>
        <Animate name="slideInLeft" timeout={1100}>
          <img key="RecCurveOne-home-1" src={RecCurveOne} alt="background" className="home-rec-one animated" />
          <img key="RecCurveTwo-home-1" src={RecCurveTwo} alt="background" className="home-rec-two animated" />
        </Animate>
        <Grid className="home-container">
          <Row className="content">
            <Col xs={12} sm={12} md={6} className="header">
              <Animate name="fadeIn" timeout={1600}>
                <h1 key="home-title" className="title animated">
                  Do You Want <br />To Analyze Your <br />GitHub Contributions?
                </h1>
              </Animate>
              <Animate name="fadeInDown" timeout={1800}>
                <div key="home-action-box" className={`action-box animated ${inputActive ? 'active' : ''}`}>
                  <input
                    type="text"
                    placeholder="username"
                    className="search-input animated"
                    ref={this.inputRef}
                    value={usernameInput}
                    onInput={this.handleInput}
                    onKeyDown={this.handleSubmit}
                  />
                  <button className="btn-dark animated" onClick={this.handleActionButton}>
                    Get Report Now
                  </button>
                </div>
              </Animate>
            </Col>
          </Row>
        </Grid>
        {this.props.latestUsers &&
          this.props.latestUsers.length && (
            <SearchCarousel latestUsers={this.props.latestUsers} goToReport={this.goToReport} />
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  latestUsers: store.home.latestUsers,
});

const mapDispatchToProps = dispatch => ({
  getLatestUsers: data => {
    dispatch({
      type: 'getLatestUsers',
      data,
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
