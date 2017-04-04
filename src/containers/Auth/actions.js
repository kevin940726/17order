import firebase from 'firebase';
import { SET_AUTH_INFO } from './constants';
import { getMenus } from '../Menus/actions';

export const setAuthInfo = auth => async (dispatch, getState) => {
  if (!auth || !auth.customToken) {
    return {};
  }

  const { value } = await dispatch({
    type: SET_AUTH_INFO,
    payload: firebase.auth()
      .signInWithCustomToken(auth.customToken)
      .then(() => auth)
      .catch(err => ({
        error: true,
        ...err
      })),
  });

  if (!value.error) {
    dispatch(getMenus());
  }
};
