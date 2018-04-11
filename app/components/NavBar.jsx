import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/lib/md/';

const NavBar = ({ match: { params: { username } } }) => (
  <nav className="nav-bar">
    <div className="container">
      <div className="logo-text">
        {username ? (
          <React.Fragment>
            <MdArrowBack />
            {username}
          </React.Fragment>
        ) : (
          'GitFame'
        )}
      </div>
    </div>
  </nav>
);

export default withRouter(NavBar);
