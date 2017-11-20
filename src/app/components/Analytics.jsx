import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';

class Analytics extends React.Component {
  searchUser() {
    fetch(`https://api.github.com/users/${this.props.match.params.username}`);
  }

  render() {
    if (this.props.searchState === 1) {
      // this.searchUser();
      return (
        <div >
          <Loader />
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  searchState: state.ui.searchState,
});

export default connect(mapStateToProps)(Analytics);
