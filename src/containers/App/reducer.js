import { handleActions } from 'redux-actions';
import { SET_AUTH_INFO } from './constants';

const auth = handleActions({
  [SET_AUTH_INFO]: (state, action) => action.payload,
}, {
  auth: {},
});

export default auth;
