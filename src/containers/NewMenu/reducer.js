import { handleActions } from 'redux-actions';
import * as C from './constants';

const defaultFields = {
  type: 'retaurant',
  name: '',
  menu: '',
  notes: '',
  file: {},
};

const newMenu = handleActions({
  [C.HANDLE_OPEN_MODAL]: state => ({
    ...state,
    isModalOpen: true,
  }),

  [C.HANDLE_CLOSE_MODAL]: state => ({
    ...state,
    isModalOpen: false,
    isEditing: false,
    fields: state.isEditing ? defaultFields : state.fields,
  }),

  [C.HANDLE_CHANGE]: (state, action) => ({
    ...state,
    fields: {
      ...state.fields,
      [action.payload.name]: action.payload.value,
    },
  }),

  [`${C.HANDLE_SUBMIT}_PENDING`]: (state) => ({
    ...state,
    isSubmitting: true,
  }),

  [`${C.HANDLE_SUBMIT}_FULFILLED`]: (state) => ({
    ...state,
    isSubmitting: false,
    isModalOpen: false,
  }),

  [`${C.HANDLE_SUBMIT}_REJECT`]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [C.EDIT_MENU]: state => ({
    ...state,
    isEditing: true,
  }),

  [C.HANDLE_INPUT_ERROR]: (state, action) => ({
    ...state,
    errors: {
      ...state.errors,
      [action.payload.name]: action.payload.message,
    },
  }),

  [C.RESET_ERROR]: state => ({
    ...state,
    errors: {},
  }),
}, {
  isModalOpen: false,
  isSubmitting: false,
  isEditing: false,
  fields: defaultFields,
  errors: {},
});

export default newMenu;
