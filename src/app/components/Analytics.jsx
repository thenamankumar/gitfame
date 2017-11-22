import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';

class Analytics extends React.Component {
  render() {
    if (this.props.searchState === 1) {
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
