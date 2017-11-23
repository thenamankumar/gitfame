import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { FaHeart } from 'react-icons/lib/fa';
import Particles from 'react-particles-js';
import ParticleConfig from '../assets/particlesjs-config.json';

class Search extends React.Component {
  componentDidMount() {
    const path = this.props.location.pathname;
    if (path !== '/') {
      const username = path.split('/')[2];
      document.getElementById('search-input').value = username;
      this.props.setSearchState(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.location.pathname === '/') {
        document.getElementById('search-input').value = '';
        this.props.setSearchState(2);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      return true;
    } else if (this.props.searchState !== nextProps.searchState) {
      return true;
    }
    return false;
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
    return (
      <div className="home-wrapper">
        <Particles params={ParticleConfig} height="100vh" />
        <Col sm={12} md={4} className="offset-md-4 search-box">
          <h1 className="title">
            <span className="ch1">G</span>
            <span className="ch2">I</span>
            <span className="ch3">T</span>
            <span className="ch4">F</span>
            <span className="ch5">A</span>
            <span className="ch6">M</span>
            <span className="ch7">E</span>
          </h1>
          <p className="sub-title">Your GitHub contributions Analyzer</p>
          <p className="description">Check your all time GitHub contributions, analyze which language and repo your
            contributed to the most and how much people love you work.
          </p>
          <p>Made with <FaHeart className="heart-icon" /> in India</p>
          <button className="btn search-btn">Search</button>
        </Col>
      </div>
    );
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
