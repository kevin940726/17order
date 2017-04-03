import { handleActions } from 'redux-actions';
import * as C from './constants';

const menus = handleActions({
  ...C.menuBinding.getReducer(),

  [C.HANDLE_CHANGE]: (state, action) => ({
    ...state,
    active: action.payload,
  }),
}, {
  ...C.menuBinding.getInitialState(),
  active: '',
});

export default menus;
