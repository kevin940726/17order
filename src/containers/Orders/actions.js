import { createAction } from 'redux-actions';
import * as C from './constants';
import db, { today } from '../../db';

export const getOrders = () => (dispatch, getState) => {
  const { auth, menus } = getState();
  const ref = db.ref(`${auth.team.id}/orders`)
    .orderByChild('menu')
    .equalTo(menus.active);

  C.orderBinding.bind(ref);

  dispatch({
    type: C.LOADING_ORDERS,
  });
};

export const removeAction = key => (dispatch, getState) => {
  const { auth } = getState();

  return dispatch({
    type: C.REMOVE_ACTION,
    payload: db.ref(`${auth.team.id}/orders/${key}`).remove(),
  });
};
