import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import {App} from './containers/index';
import {Provider} from "react-redux";
import store from "./store/store";
import {createBrowserHistory} from 'history';

//шрифты для @material-ui/core
import 'fontsource-roboto';

// создаём кастомную историю
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store} >
          <BrowserRouter history={history}>
              <Route path="/" component={App} />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

