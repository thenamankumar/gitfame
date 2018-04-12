import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';

import Animate from '../components/Animate';
import RecCurveOne from '../assets/svg/RecCurveOne.svg';
import RecCurveTwo from '../assets/svg/RecCurveTwo.svg';

const Home = ({ location: { pathname } }) => {
  const show = pathname === '/';

  return (
    <React.Fragment>
      <Animate
        transitionName={{
          appear: 'slideInLeft',
          enter: 'slideInLeft',
          leave: 'slideOutLeft',
        }}
        show={show}
        transitionAppear
        transitionEnter
        transitionLeave
        transitionAppearTimeout={1100}
        transitionEnterTimeout={1100}
        transitionLeaveTimeout={1100}>
        <img key={uuid()} src={RecCurveOne} alt="gitfame shades" className="home-rec-one animated" />
        <img key={uuid()} src={RecCurveTwo} alt="gitfame shades" className="home-rec-two animated" />
      </Animate>
    </React.Fragment>
  );
};

export default withRouter(Home);
