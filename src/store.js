import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './containers/Auth/reducer';
import form from './containers/Form/reducer';
import orders from './containers/Orders/reducer';

export default createStore(
  combineReducers({
    auth,
    form,
    orders,
  }),
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    promiseMiddleware()
  ))
);
