import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './containers/index';

//шрифты для @material-ui/core
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

