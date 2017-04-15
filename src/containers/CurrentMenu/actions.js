import db from '../../db';
import { handleChange } from '../Menus/actions';

export const handleRemove = () => async (dispatch, getState) => {
  const { auth, menus } = getState();

  await db.ref(`${auth.team.id}/menus/${menus.active}`).remove();

  // change active to the second menu
  dispatch(handleChange(getState().menus.menus.first().key));
};
