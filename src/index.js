import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.css';

import './db';
import store from './store';
import App from './containers/App';
import AuthRedirect from './containers/Auth/AuthRedirect';
import LogIn from './containers/Auth/LogIn';
import SignOut from './containers/Auth/SignOut';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LogIn} />
          <Route path="/auth" component={AuthRedirect} />  
          <Route path="/signout" component={SignOut} />
          <Route path="/:menuId" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
