import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Animate = ({
  children,
  show = true,
  transitionAppear = true,
  transitionEnter = true,
  transitionLeave = true,
  ...rest
}) => (
  <ReactCSSTransitionGroup
    transitionAppear={transitionAppear}
    transitionEnter={transitionEnter}
    transitionLeave={transitionLeave}
    {...rest}>
    {show && children}
  </ReactCSSTransitionGroup>
);

export default Animate;
