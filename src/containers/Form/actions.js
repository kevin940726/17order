import { createAction } from 'redux-actions';
import { HANDLE_CHANGE, HANDLE_SUBMIT, EDIT_ORDER, HANDLE_EDIT_CANCEL } from './constants';
import db, { today } from '../../db';

const ref = db.ref(today);

export const handleChange = createAction(HANDLE_CHANGE, (name, value) => ({
  name,
  value,
}));

export const handleSubmit = () => (dispatch, getState) => {
  const { form, auth } = getState();
  const order = {
    date: today,
    memberId: auth.user.id,
    memberName: auth.user.name,
    order: form.order,
    timestamp: Date.now(),
  };

  ref.child('orders')
    .push()
    .set(order);
  
  return dispatch({
    type: HANDLE_SUBMIT,
  });
};

export const editOrder = (key) => (dispatch, getState) => {
  const order = getState().orders.orders.find(o => o.key === key);

  dispatch(handleChange('order', order.order));

  return dispatch({
    type: EDIT_ORDER,
    payload: key,
  });
};

export const handleEditCancel = createAction(HANDLE_EDIT_CANCEL);

export const handleEdit = () => (dispatch, getState) => {
  const { editKey, order } = getState().form;

  ref.child('orders')
    .child(editKey)
    .transaction(val => ({
      ...val,
      order,
      timestamp: Date.now(),
    }))
    .then(() => {
      dispatch(handleEditCancel());
    });
};
