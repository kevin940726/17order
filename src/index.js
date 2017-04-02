import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.css';

import './db';
import store from './store';
import App from './containers/App';
import Auth from './containers/Auth';
import SignOut from './containers/Auth/SignOut';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/auth/redirect" component={Auth} />  
        <Route path="/signout" component={SignOut} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
