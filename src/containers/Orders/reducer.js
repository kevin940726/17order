import { handleActions } from 'redux-actions';
import * as C from './constants';

const orders = handleActions({
  ...C.orderBinding.getReducer(),

  [C.LOADING_ORDERS]: state => ({
    ...state,
    [C.IS_LOADING]: true,
    [C.ORDERS_LIST]: state[C.ORDERS_LIST].clear(),
  }),
}, {
  ...C.orderBinding.getInitialState(),
});

export default orders;
