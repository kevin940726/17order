import db from '../../db';
import * as C from './constants';
import { getOrders } from '../Orders/actions';
import { push } from 'react-router-redux';

export const handleChange = menu => (dispatch) => {
  dispatch({
    type: C.HANDLE_CHANGE,
    payload: menu,
  });
  dispatch(push(`/${menu}`));

  dispatch(getOrders());
};

export const getMenus = params => (dispatch, getState) => {
  const { auth } = getState();

  const ref = db.ref(`${auth.team.id}/menus`)
    .orderByChild('timestamp');

  C.menuBinding.bind(ref);

  // dirty hack, bear with me now
  const { menuId } = params || {};

  if (menuId) {
    dispatch(handleChange(menuId));
  } else {
    ref.limitToLast(1)
      .once('child_added')
      .then((snapshot) => {
        dispatch(handleChange(snapshot.key));
      });
  }
};

export const expandMenus = () => ({
  type: C.EXPAND_MENUS,
});
