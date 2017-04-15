import { handleActions } from 'redux-actions';
import { HANDLE_CHANGE, HANDLE_SUBMIT, EDIT_ORDER, HANDLE_EDIT_CANCEL } from './constants.js';

const defaultBeveragesFields = {
  size: 'big',
  sugar: 'regular',
  ice: 'regular',
};

const form = handleActions({
  [HANDLE_CHANGE]: (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),

  [HANDLE_SUBMIT]: state => ({
    ...state,
    order: '',
  }),

  [EDIT_ORDER]: (state, action) => ({
    ...state,
    editKey: action.payload,
  }),

  [HANDLE_EDIT_CANCEL]: state => ({
    ...state,
    order: '',
    editKey: null,
  }),
}, {
  order: '',
  ...defaultBeveragesFields,
  editKey: null,
});

export default form;
