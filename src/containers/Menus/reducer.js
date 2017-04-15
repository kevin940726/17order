import { handleActions } from 'redux-actions';
import * as C from './constants';

const menus = handleActions({
  ...C.menuBinding.getReducer(),

  [C.HANDLE_CHANGE]: (state, action) => ({
    ...state,
    active: action.payload,
  }),

  [C.EXPAND_MENUS]: state => ({
    ...state,
    isExpanded: !state.isExpanded,
  }),
}, {
  ...C.menuBinding.getInitialState(),
  active: '',
  isExpanded: false,
});

export default menus;
