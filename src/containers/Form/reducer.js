import { handleActions } from 'redux-actions';
import { HANDLE_CHANGE, HANDLE_SUBMIT } from './constants.js';

const form = handleActions({
  [HANDLE_CHANGE]: (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),

  [HANDLE_SUBMIT]: state => ({
    ...state,
    order: '',
  }),
}, {
  order: '',
});

export default form;
