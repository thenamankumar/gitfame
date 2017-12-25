import React from 'react';
import { Col } from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: props.match.params.username ? 'compact' : 'expanded',
    };
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    if (username) {
      document.getElementById('search-input').value = username;
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.match.params.username !== nextProps.match.params.username;
  }

  componentDidUpdate() {
    const { username } = this.props.match.params;
    if (!username) {
      document.getElementById('search-input').value = username;
    }
  }

  process(event) {
    event.preventDefault();
    const username = document.getElementById('search-input').value;
    if (username === '') {
      // If username is null return to homepage
      this.props.history.push('/');
    } else {
      // Update location
      this.props.history.push(`/user/${username}`);
    }
  }

  render() {
    console.log('Render Search');
    if (this.state.searchBox === 'expanded') {
      return (
        <div className="home-wrapper">
          <Col sm={12} className="search-box">
            <h1 className="title animated fadeInUp">
              Your GitHub contributions Analyzer
            </h1>
            <Col sm={12} md={6} className="offset-md-3 description animated fadeInDown">
              <p className="bold">Check your all time GitHub contributions, analyze which language and repo you
                contributed to the most and how much people love your work.
              </p>
            </Col>
            <Col sm={12} md={4} className="offset-md-4">
              <form onSubmit={this.process} autoComplete="off" className="animated fadeInDown">
                <span className="search-label">@</span>
                <input id="search-input" type="text" placeholder="username" />
              </form>
            </Col>
          </Col>
        </div>
      );
    } else if (this.state.searchBox === 'compact') {
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

    return <div />;
  }
}

export default Search;
