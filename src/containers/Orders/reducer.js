import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import { LOADED_ORDER, APPEND_ORDER, DELETE_ORDER, SET_ORDER } from './constants';

const orders = handleActions({
  [LOADED_ORDER]: (state) => ({
    ...state,
    isLoading: false,
  }),

  [APPEND_ORDER]: (state, action) => ({
    ...state,
    orders: state.orders.unshift(action.payload),
  }),

  [DELETE_ORDER]: (state, action) => ({
    ...state,
    orders: state.orders.delete(
      state.orders.findIndex(order => order.key === action.payload)
    ),
  }),

  [SET_ORDER]: (state, action) => ({
    ...state,
    orders: state.orders.set(
      state.orders.findIndex(order => order.key === action.payload.key),
      action.payload
    ),
  }),
}, {
  orders: List(),
  isLoading: true,
});

export default orders;
