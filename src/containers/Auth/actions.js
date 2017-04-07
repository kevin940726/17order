import firebase from 'firebase';
import { SET_AUTH_INFO } from './constants';
import { setAppLocalStorage } from '../../utils/localStorage';

export const setAuthInfo = auth => async (dispatch, getState) => {
  if (!auth || !auth.customToken) {
    return {};
  }

  dispatch({
    type: `${SET_AUTH_INFO}_PENDING`,
  });

  try {
    await firebase.auth().signInWithCustomToken(auth.customToken);
  
    setAppLocalStorage(auth);

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

export const authTest = localAuth => async (dispatch) => {
  const { access_token } = localAuth;

  try {
    const formData = new FormData();
    formData.append('token', access_token);

    const auth = await fetch('https://slack.com/api/auth.test', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json());

    if (!auth || auth.ok !== true) {
      throw new Error('auth test not passed');
    }

    return dispatch(setAuthInfo(localAuth));
  } catch (err) {
    return Promise.reject(err);
  }
};
