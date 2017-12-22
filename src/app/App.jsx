import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './assets/scss/main.scss';
import store from './store/index';
import Search from './components/Search';
import Analytics from './components/Analytics';
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
          </Grid>
        </Router>
      </Provider>
    );
  }
}

export default App;
