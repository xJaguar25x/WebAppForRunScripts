import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import {App} from './containers/index';
import {Provider} from "react-redux";
import store from "./store/store";

//шрифты для @material-ui/core
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Route path="/" component={App} />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

