import React from 'react';
import { connect } from 'react-redux';
import { Link as To } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa';
import BorderGrad from './BorderGrad';

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
    if (this.props.location.pathname !== nextProps.location.pathname) { return true; } else
    if (this.props.searchState !== nextProps.searchState) { return true; }
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
      <div>
        <Col sm={12} className={this.props.searchState === 1 ? 'search-wrapper search-wrapper-collapse' : 'search-wrapper'}>
          <div className="logo-box">
            <To to="/" className="logo-text"><span className="primary">Git</span><span className="secondary">Fame</span>
            </To>
          </div>
          <div className="git-btn-grp pull-right">
            <a
              className="github-button"
              href="https://github.com/hereisnaman/gitfame"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star hereisnaman/gitfame on GitHub"
            >Star
            </a>
            <a
              className="github-button"
              href="https://github.com/hereisnaman/gitfame/fork"
              data-icon="octicon-repo-forked"
              data-show-count="true"
              aria-label="Fork hereisnaman/gitfame on GitHub"
            >Fork
            </a>
          </div>
          <Col sm={8} className="search-box offset-sm-2">
            <form onSubmit={e => this.process(e)} autoComplete="on" className={this.props.searchState === 1 ? 'form-collapse' : ''}>
              <FaSearch className="search-icon" />
              <input id="search-input" type="text" name="Username" placeholder="Enter username" />
            </form>
          </Col>
        </Col>
        <BorderGrad />
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
