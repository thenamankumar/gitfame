import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './assets/scss/main.scss';
import store from './store/index';
import Search from './components/Search';
import Analytics from './components/Analytics';
import Comparison from './components/Comparison';
import NavBar from './components/NavBar';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grid fluid className="main-container">
            <NavBar />
            <Route exact path="/" component={Search} />
            <Route exact path="/user/:username" component={Search} />
            <Route exact path="/user/:username" component={Analytics} />
            <Route exact path="/compare/:username1/:username2" component={Comparison} />
          </Grid>
        </Router>
      </Provider>
    );
  }
}

export default App;
