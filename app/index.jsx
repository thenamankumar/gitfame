import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';

import './index.html';
import './assets/scss/main.scss';
import store from './store';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Report from './containers/Report';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Route path="/:username?" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/:username" component={Report} />
      </div>
    </Router>
  </Provider>
);

render(<App />, document.getElementById('app'));
