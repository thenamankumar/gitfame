import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as To } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa';

class Search extends React.Component {
  process(event) {
    event.preventDefault();
    console.log('Event');
    this.props.collapseSearch();
    const url = `/user/${document.getElementById('search-input').value}`;
    this.props.updateLoc(push(url));
  }

  render() {
    return (
      <Col sm={12} className={this.props.collapse ? 'search-wrapper search-wrapper-collapse' : 'search-wrapper'}>
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
          <form onSubmit={e => this.process(e)}className={this.props.collapse ? 'form-collapse' : ''}>
            <FaSearch className="search-icon" />
            <input id="search-input" type="text" name="Username" placeholder="Enter username" />
          </form>
        </Col>
      </Col>
    );
  }
}

Search.propTypes = {
  collapse: PropTypes.bool.isRequired,
  collapseSearch: PropTypes.func.isRequired,
  updateLoc: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ collapse: state.ui.searchCollapse });

const mapDispatchToProps = dispatch => ({
  collapseSearch: () => {
    dispatch({
      type: 'collapseSearch',
    });
  },
  expandSearch: () => {
    dispatch({
      type: 'expandSearch',
    });
  },
  updateLoc: (pushFnc) => {
    dispatch(pushFnc);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
