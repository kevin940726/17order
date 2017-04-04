import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import auth from './containers/Auth/reducer';
import form from './containers/Form/reducer';
import orders from './containers/Orders/reducer';
import newMenu from './containers/NewMenu/reducer';
import menus from './containers/Menus/reducer';

export const history = createHistory();

export default createStore(
  combineReducers({
    router,
    auth,
    form,
    orders,
    newMenu,
    menus,
  }),
  composeWithDevTools(applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
    promiseMiddleware()
  ))
);
