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
    .startAt(until.getTime())
    .endAt(Date.now());

  C.menuBinding.bind(ref);

  ref.limitToLast(1)
    .once('child_added')
    .then((snapshot) => {
      dispatch(handleChange(snapshot.key));
    });
};
