import React from 'react';
import { render } from 'react-dom';

import './index.html';
import './app/assets/css/theme.css';
import App from './app/app';

render(<App />, document.getElementById('app'));
