import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './assets/scss/main.scss';
import store from './store/index';
import Search from './components/Search';
import BorderGrad from './components/BorderGrad';

class App extends React.Component {
  constructor() {
    super();
    console.log('App');
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grid fluid className="main-container">
            <Route exact pattern="/" component={Search} />
            <BorderGrad />
          </Grid>
        </Router>
      </Provider>
    );
  }
}

export default App;
