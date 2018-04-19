import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { TiArrowRight } from 'react-icons/lib/ti/';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      usernameInput: props.match.params.username,
    };
  }

  handleInput = e => {
    e.preventDefault();
    const { current: { value } } = this.inputRef;

    if (!value || /^[^/ ]*$/.test(value)) {
      this.setState({
        usernameInput: value,
      });
    }
  };

  handleSubmit = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const { history } = this.props;
      const { usernameInput } = this.state;
      history.push(`/user/${usernameInput.toLowerCase()}`);
    }
  };

  render() {
    const { match: { params: { username } } } = this.props;
    const { usernameInput } = this.state;
    const logo = (
      <Link as="div" to="/" className="logo-text animated no-under">
        GITFAME
      </Link>
    );
    const menu = (
      <ul className="menu animated">
        <a href="https://github.com/hereisnaman/gitfame/" target="_blank" rel="noreferrer noopener" className="item">
          GitHub
        </a>
      </ul>
    );
    const backBox = (
      <div className="back-text animated under">
        <input
          type="text"
          placeholder="username"
          className="username-input"
          ref={this.inputRef}
          value={usernameInput}
          onChange={this.handleInput}
          onInput={this.handleInput}
          onKeyDown={this.handleSubmit}
        />
        <Link to={`/user/${(usernameInput || '').toLowerCase()}`} className="no-under">
          <TiArrowRight className="back-icon" />
        </Link>
      </div>
    );

    return (
      <Grid className="nav-bar">
        <Row className="animated">
          <Col xs={12} sm={12} className="box">
            {logo}
            {username && backBox}
            {!username && menu}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(NavBar);
