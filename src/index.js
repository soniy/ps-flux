import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as BR } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
  <BR>
    <App />
  </BR>,
  document.getElementById('root'));