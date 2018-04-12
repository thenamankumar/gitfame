import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Animate = ({ children, show = true, ...rest }) => (
  <ReactCSSTransitionGroup {...rest}>{show && children}</ReactCSSTransitionGroup>
);

export default Animate;
