import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Animate from '../components/Animate';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';
import RecCurveTwo from '../assets/svg/RecCurveTwo.svg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    inputActive: false,
    usernameInput: '',
  };

  handleInput = e => {
    e.preventDefault();
    const { current: { value } } = this.inputRef;

    if (!value || value.match(/[a-z]/i)) {
      this.setState({
        usernameInput: value,
      });
    }
  };

  handleActionButton = e => {
    e.preventDefault();
    const { inputActive, usernameInput } = this.state;
    if (inputActive) {
      if (usernameInput) {
        const { history } = this.props;
        history.push(`/user/${usernameInput}`);
        return;
      }
    }
    this.setState({
      inputActive: true,
    });
  };

  handleSubmit = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const { history } = this.props;
      const { usernameInput } = this.state;
      history.push(`/user/${usernameInput}`);
    }
  };

  render() {
    const { match: { params: { username } } } = this.props;
    const { inputActive, usernameInput } = this.state;

    return (
      <React.Fragment>
        <Animate
          transitionName={{
            appear: 'slideInLeft',
            enter: 'slideInLeft',
            leave: 'slideOutLeft',
          }}
          show={!username}
          transitionAppearTimeout={1100}
          transitionEnterTimeout={1100}
          transitionLeaveTimeout={1300}>
          <img key="RecCurveOne-home-1" src={RecCurveOne} alt="gitfame shades" className="home-rec-one animated" />
          <img key="RecCurveTwo-home-1" src={RecCurveTwo} alt="gitfame shades" className="home-rec-two animated" />
        </Animate>
        <Grid>
          <Row className="content">
            <Col xs={12} sm={12} md={6} className="header">
              <Animate
                transitionName={{
                  appear: 'fadeIn',
                  enter: 'fadeIn',
                  leave: 'fadeOutLeft',
                }}
                show={!username}
                transitionAppearTimeout={1600}
                transitionEnterTimeout={1600}
                transitionLeaveTimeout={1000}>
                <h1 key="home-title" className="title animated">
                  Do You Want <br />To Analyze Your <br />GitHub Contributions?
                </h1>
              </Animate>
              <Animate
                transitionName={{
                  appear: 'fadeInDown',
                  enter: 'fadeInDown',
                  leave: 'fadeOutLeft',
                }}
                show={!username}
                transitionAppearTimeout={1800}
                transitionEnterTimeout={1800}
                transitionLeaveTimeout={1000}>
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
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
