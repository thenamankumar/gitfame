import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TiArrowRight } from 'react-icons/lib/ti/';

import Animate from './Animate';

const NavBar = ({ match: { params: { username } } }) => {
  const logo = <div className="logo-text animated">GITFAME</div>;
  const menu = (
    <ul className="menu animated">
      <Link as="li" to="/how" className="item">
        How this works
      </Link>
    </ul>
  );
  const backBox = (
    <Link as="div" to="/" className="logo-text animated">
      {username}
      <TiArrowRight className="back-icon" />
    </Link>
  );

  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="row">
          <Animate
            transitionName={{
              appear: 'fadeInLeft',
              enter: 'fadeInLeft',
              leave: 'fadeOutLeft',
            }}
            show={!username}
            transitionAppear
            transitionEnter
            transitionLeave
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            {logo}
            {menu}
          </Animate>
          <Animate
            transitionName={{
              appear: 'fadeInRight',
              enter: 'fadeInRight',
              leave: 'fadeOutRight',
            }}
            show={username || false}
            transitionAppear
            transitionEnter
            transitionLeave
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            <div />
            {backBox}
          </Animate>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
