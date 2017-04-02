import { createAction } from 'redux-actions';
import { GET_ORDERS, APPEND_ORDER, DELETE_ORDER, SET_ORDER, REMOVE_ACTION } from './constants';
import db, { today } from '../../db';

const ref = db.ref(today);

export const appendOrder = createAction(APPEND_ORDER);

export const deleteOrder = createAction(DELETE_ORDER);

export const setOrder = createAction(SET_ORDER);

export const getOrders = () => (dispatch) => {
  const ordersRef = ref.child('orders');
  
  ordersRef.orderByChild('timestamp')
    .on('child_added', (snapshot) => {
      dispatch(appendOrder({
        ...snapshot.val(),
        key: snapshot.key,
      }));
    });

  ordersRef.on('child_removed', (snapshot) => {
    dispatch(deleteOrder(snapshot.key))
  });

  ordersRef.on('child_changed', (snapshot) => {
    dispatch(setOrder({
      ...snapshot.val(),
      key: snapshot.key,
    }));
  });

  return dispatch({
    type: GET_ORDERS,
  });
};

export const removeAction = createAction(REMOVE_ACTION, key => (
  ref.child('orders')
    .child(key)
    .remove()
));
