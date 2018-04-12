import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';
import RecCurveTwo from '../assets/svg/RecCurveTwo.svg';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReactCSSTransitionGroup
          transitionName={{
            appear: 'slideInLeft',
            leave: 'slideOutRight',
          }}
          transitionAppear
          transitionEnter={false}
          transitionLeave
          transitionAppearTimeout={1100}
          transitionLeaveTimeout={1100}>
          <img key={uuid()} src={RecCurveOne} alt="gitfame shades" className="home-rec-one animated" />
          <img key={uuid()} src={RecCurveTwo} alt="gitfame shades" className="home-rec-two animated" />
        </ReactCSSTransitionGroup>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
