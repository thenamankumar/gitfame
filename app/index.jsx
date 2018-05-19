import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import './index.html';
import './assets/scss/main.scss';
import store from './store';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Report from './containers/Report';
import Footer from './components/Footer';
import Capture from './components/Capture';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <div className="github-star">
          <a
            className="github-button"
            href="https://github.com/hereisnaman/gitfame"
            target="_blank"
            rel="noopener noreferrer"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star hereisnaman/gitfame on GitHub">
            Star
          </a>
        </div>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/user/:username" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:username" component={Report} />
        <Route exact path="/" component={Footer} />
        <Route exact path="/user/:username" component={Footer} />
        <Capture />
      </div>
    </Router>
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.GA_CODE);
  Raven.config(process.env.SENTRY_URL).install(); // eslint-disable-line
}
render(<App />, document.getElementById('app'));
