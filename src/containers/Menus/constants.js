import createBinding from '../../utils/firebaseListBinding';

export const GET_MENUS = 'Menus/GET_MENUS';

export const APPEND_MENU = 'Menus/APPEND_MENU';

export const DELETE_MENU = 'Menus/DELETE_MENU';

export const SET_MENU = 'Menus/SET_MENU';

export const menuBinding = createBinding('menus', {
  onceValue: GET_MENUS,
  onChildAdded: APPEND_MENU,
  onChildRemoved: DELETE_MENU,
  onChildChanged: SET_MENU,
  isLoading: 'isMenusLoading',
});

export const HANDLE_CHANGE = 'Menus/HANDLE_CHANGE';
