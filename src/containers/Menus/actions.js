import db from '../../db';
import * as C from './constants';
import { getOrders } from '../Orders/actions';

export const handleChange = menu => async (dispatch) => {
  await dispatch({
    type: C.HANDLE_CHANGE,
    payload: menu,
  });

  dispatch(getOrders());
};

export const getMenus = () => (dispatch, getState) => {
  const { auth } = getState();
  const ref = db.ref(`${auth.team.id}/menus`)
    .orderByChild('timestamp');

  C.menuBinding.bind(ref);

  ref.limitToLast(1)
    .once('child_added')
    .then((snapshot) => {
      dispatch(handleChange(snapshot.key));
    });
};
