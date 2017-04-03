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

  const now = new Date();
  // up until 7 days ago
  const until = new Date(now.setDate(now.getDate() - 7));

  const ref = db.ref(`${auth.team.id}/menus`)
    .orderByChild('timestamp')
    .startAt(until.getTime());

  C.menuBinding.bind(ref);

  ref.limitToLast(1)
    .once('child_added')
    .then((snapshot) => {
      dispatch(handleChange(snapshot.key));
    });
};

export const handleEdit = () => (dispatch, getState) => {

};

export const handleRemove = () => async (dispatch, getState) => {
  const { auth, menus } = getState();

  await db.ref(`${auth.team.id}/menus/${menus.active}`).remove();

  // change active to the second menu
  dispatch(handleChange(getState().menus.menus.first().key));
};
