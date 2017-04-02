import { createAction } from 'redux-actions';
import firebase from 'firebase';
import { SET_AUTH_INFO } from './constants';

export const setAuthInfo = createAction(SET_AUTH_INFO, auth => {
  if (!auth || !auth.customToken) {
    return Promise.resolve({});
  }

  return firebase.auth()
    .signInWithCustomToken(auth.customToken)
    .then(() => auth)
    .catch((err) => {
      console.error(err.message);
    });
});
