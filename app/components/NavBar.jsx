import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TiArrowLeft } from 'react-icons/lib/ti/';

const NavBar = ({ match: { params: { username } } }) => (
  <nav className="nav-bar">
    <div className="container">
      <div className="row">
        {username ? (
          <Link as="div" to="/" className="logo-text">
            <TiArrowLeft className="back-icon" />
            {username}
          </Link>
        ) : (
          <div className="logo-text">GITFAME</div>
        )}
        {!username && (
          <ul className="menu">
            <Link as="li" to="/how" className="item">
              How this works
            </Link>
          </ul>
        )}
      </div>
    </div>
  </nav>
);

export default withRouter(NavBar);
