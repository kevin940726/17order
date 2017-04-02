import { handleActions } from 'redux-actions';
import { SET_AUTH_INFO } from './constants';

const auth = handleActions({
  [`${SET_AUTH_INFO}_FULFILLED`]: (state, action) => action.payload,
}, {});

export default auth;
