import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Animate = ({
  children,
  show = true,
  name,
  timeout = 1000,
  transitionAppear = true,
  transitionEnter = true,
  transitionLeave = false,
  ...rest
}) => (
  <ReactCSSTransitionGroup
    transitionName={{
      appear: name,
      enter: name,
    }}
    transitionAppear={transitionAppear}
    transitionEnter={transitionEnter}
    transitionLeave={transitionLeave}
    transitionAppearTimeout={timeout}
    transitionEnterTimeout={timeout}
    {...rest}>
    {show && children}
  </ReactCSSTransitionGroup>
);

export default Animate;
