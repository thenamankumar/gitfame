import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.html';
import './assets/scss/main.scss';
import store from './store';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Report from './containers/Report';
import Footer from './components/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Route exact path="/" component={NavBar} />
        <Route exact path="/user/:username" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:username" component={Report} />
        <Route exact path="/" component={Footer} />
        <Route exact path="/user/:username" component={Footer} />
      </div>
    </Router>
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_URL).install(); // eslint-disable-line
}
render(<App />, document.getElementById('app'));
