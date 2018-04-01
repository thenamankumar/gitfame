import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import './index.html';
import store from './store';

const App = () => (
  <Provider store={store}>
    <h1>Hello World!</h1>
  </Provider>
);

render(<App />, document.getElementById('app'));
