import { createAction } from 'redux-actions';
import { HANDLE_CHANGE, HANDLE_SUBMIT, EDIT_ORDER, HANDLE_EDIT_CANCEL } from './constants';
import db from '../../db';
import { TODAY } from '../../utils/constants';
import { currentMenuSelector } from '../CurrentMenu/selectors';

export const handleChange = createAction(HANDLE_CHANGE, (name, value) => ({
  name,
  value,
}));

export const handleSubmit = () => (dispatch, getState) => {
  const { form, auth, menus } = getState();

  if (!form.order) {
    return;
  }

  const type = currentMenuSelector(getState()).type;

  const order = {
    date: TODAY,
    menu: menus.active,
    memberId: auth.user.id,
    memberName: auth.user.name,
    order: form.order,
    ...(type === 'beverages' ? {
      size: form.size,
      sugar: form.sugar,
      ice: form.ice,
    } : {}),
    timestamp: Date.now(),
  };

  db.ref(`${auth.team.id}/orders`)
    .push()
    .set(order);
  
  return dispatch({
    type: HANDLE_SUBMIT,
  });
};

export const editOrder = (key) => (dispatch, getState) => {
  const { orders } = getState();
  const order = orders.orders.find(o => o.key === key);

  dispatch(handleChange('order', order.order));

  return dispatch({
    type: EDIT_ORDER,
    payload: key,
  });
};

export const handleEditCancel = createAction(HANDLE_EDIT_CANCEL);

export const handleEdit = () => (dispatch, getState) => {
  const { auth, form } = getState();
  const { editKey, order } = form;

  db.ref(`${auth.team.id}/orders`)
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
