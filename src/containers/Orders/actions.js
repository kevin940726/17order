import { createAction } from 'redux-actions';
import { GET_ORDERS, APPEND_ORDER } from './constants';
import db, { today } from '../../db';

const ref = db.ref(today);

export const appendOrder = createAction(APPEND_ORDER);

export const getOrders = () => (dispatch) => {
  ref.child('orders')
    .orderByChild('timestamp')
    .on('child_added', (snapshot) => {
      dispatch(appendOrder(snapshot.val()));
    });

  return dispatch({
    type: GET_ORDERS,
  });
};
