import createBinding from '../../utils/firebaseListBinding';

export const LOADING_ORDERS = 'Orders/LOADING_ORDERS';

export const GET_ORDERS = 'Orders/GET_ORDERS';

export const APPEND_ORDER = 'Orders/APPEND_ORDER';

export const DELETE_ORDER = 'Orders/DELETE_ORDER';

export const SET_ORDER = 'Orders/SET_ORDER';

export const ORDERS_LIST = 'orders';

export const IS_LOADING = 'isOrdersLoading';

export const orderBinding = createBinding({
  list: ORDERS_LIST,
  onceValue: GET_ORDERS,
  onChildAdded: APPEND_ORDER,
  onChildRemoved: DELETE_ORDER,
  onChildChanged: SET_ORDER,
  isLoading: IS_LOADING,
});

export const REMOVE_ACTION = 'Orders/REMOVE_ACTION';
