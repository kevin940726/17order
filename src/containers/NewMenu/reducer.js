import { handleActions } from 'redux-actions';
import * as C from './constants';

const newMenu = handleActions({
  [C.HANDLE_OPEN_MODAL]: state => ({
    ...state,
    isModalOpen: true,
  }),

  [C.HANDLE_CLOSE_MODAL]: state => ({
    ...state,
    isModalOpen: false,
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
}, {
  isModalOpen: false,
  isSubmitting: false,
  fields: {
    type: 'retaurant',
    name: '',
    menu: {},
    notes: '',
  },
});

export default newMenu;
