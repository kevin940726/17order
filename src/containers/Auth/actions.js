import firebase from 'firebase';
import { SET_AUTH_INFO } from './constants';

export const setAuthInfo = auth => (dispatch, getState) => {
  if (!auth || !auth.customToken) {
    return {};
  }

  return dispatch({
    type: SET_AUTH_INFO,
    payload: firebase.auth()
      .signInWithCustomToken(auth.customToken)
      .then(() => auth)
      .catch(err => ({
        error: true,
        ...err
      })),
  });
};
