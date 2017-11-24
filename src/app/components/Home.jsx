import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

class Search extends React.Component {
  constructor() {
    super();
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    if (username) {
      document.getElementById('search-input').value = username;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.match.params.username === '') {
        this.props.setSearchState(2);
        document.getElementById('search-input').value = '';
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      return true;
    } else if (this.props.searchState !== nextProps.searchState) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { username } = this.props.match.params;
    if (!username && this.props.searchState === 1) {
      document.getElementById('search-input').value = username;
    }
  }

  process(event) {
    event.preventDefault();
    const username = document.getElementById('search-input').value;
    if (username === '') {
      this.props.history.push('/');
      this.props.setSearchState(2);
    } else {
      this.props.history.push(`/user/${username}`);
      this.props.setSearchState(1);
    }
  }

  render() {
    const { username } = this.props.match.params;
    if (!username) {
      return (
        <div className="home-wrapper">
          <Col sm={12} className="search-box">
            <h1 className="title">
            Your GitHub contributions Analyzer
            </h1>
            <Col sm={12} md={6} className="offset-md-3 description">
              <p className="bold">Check your all time GitHub contributions, analyze which language and repo you
              contributed to the most and how much people love your work.
              </p>
            </Col>
            <Col sm={12} md={4} className="offset-md-4">
              <form onSubmit={this.process} autoComplete="off">
                <span className="search-label">@</span>
                <input id="search-input" type="text" placeholder="username" />
              </form>
            </Col>
          </Col>
        </div>
      );
    }
    return (
      <div className="home-wrapper small">
        <Col sm={12} className="search-box small">
          <Col sm={12} md={4} className="offset-md-4">
            <form onSubmit={this.process} autoComplete="off">
              <span className="search-label">@</span>
              <input id="search-input" className="small" type="text" placeholder="username" />
            </form>
          </Col>
        </Col>
      </div>);
  }
}

const mapStateToProps = state => ({
  searchState: state.ui.searchState,
});

const mapDispatchToProps = dispatch => ({
  setSearchState: (state) => {
    dispatch({
      type: 'setSearchState',
      state,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
