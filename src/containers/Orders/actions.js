import { createAction } from 'redux-actions';
import { LOADED_ORDER, APPEND_ORDER, DELETE_ORDER, SET_ORDER, REMOVE_ACTION } from './constants';
import db, { today } from '../../db';
import store from '../../store';

const ref = db.ref(today);
const ordersRef = ref.child('orders');

export const loadedOrder = createAction(LOADED_ORDER);

export const appendOrder = createAction(APPEND_ORDER);

export const deleteOrder = createAction(DELETE_ORDER);

export const setOrder = createAction(SET_ORDER);

export const removeAction = createAction(REMOVE_ACTION, key => (
  ref.child('orders')
    .child(key)
    .remove()
));

// bind only once
ordersRef.once('value')
  .then(() => {
    store.dispatch(loadedOrder());
  });

ordersRef.orderByChild('timestamp')
  .on('child_added', (snapshot) => {
    store.dispatch(appendOrder({
      ...snapshot.val(),
      key: snapshot.key,
    }));
  });

ordersRef.on('child_removed', (snapshot) => {
  store.dispatch(deleteOrder(snapshot.key))
});

ordersRef.on('child_changed', (snapshot) => {
  store.dispatch(setOrder({
    ...snapshot.val(),
    key: snapshot.key,
  }));
});
