import firebase from 'firebase';
import { SET_AUTH_INFO } from './constants';

export const setAuthInfo = auth => async (dispatch, getState) => {
  if (!auth || !auth.customToken) {
    return {};
  }

  dispatch({
    type: `${SET_AUTH_INFO}_PENDING`,
  });

  try {
    await firebase.auth().signInWithCustomToken(auth.customToken);
  
    Object.entries(auth)
      .forEach(([key, value]) => {
        window.localStorage.setItem(key, value);
      });

    return dispatch({
      type: `${SET_AUTH_INFO}_FULFILLED`,
      payload: auth,
    });
  } catch (err) {
    return dispatch({
      type: `${SET_AUTH_INFO}_REJECT`,
      payload: {
        error: true,
        ...err,
      },
    });
  }
};
