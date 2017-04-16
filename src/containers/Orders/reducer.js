import { handleActions } from 'redux-actions';
import * as C from './constants';

const orders = handleActions({
  ...C.orderBinding.getReducer(),

  [C.LOADING_ORDERS]: state => ({
    ...state,
    [C.IS_LOADING]: true,
    [C.ORDERS_LIST]: state[C.ORDERS_LIST].clear(),
  }),

  [C.CHANGE_VIEW]: (state, action) => ({
    ...state,
    view: action.payload,
  }),
}, {
  ...C.orderBinding.getInitialState(),
  view: 'list',
});

export default orders;
