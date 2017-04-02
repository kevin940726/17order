import { handleActions } from 'redux-actions';
import { GET_ORDERS, APPEND_ORDER } from './constants';

const orders = handleActions({
  [GET_ORDERS]: (state, action) => ({
    ...state,
    isLoading: true,
  }),

  [APPEND_ORDER]: (state, action) => ({
    ...state,
    isLoading: false,
    orders: [action.payload, ...state.orders],
  }),
}, {
  orders: [],
  isLoading: false,
});

export default orders;
