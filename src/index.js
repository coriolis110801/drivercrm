import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthRoutes from './AuthRoutes';
import './global.css';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <AuthRoutes />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
