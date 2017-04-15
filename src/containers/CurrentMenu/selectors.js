import { createSelector } from 'reselect';
import { MENUS_LIST } from '../Menus/constants';

const menusSelector = state => state.menus[MENUS_LIST];
const valueSelector = state => state.menus.active;
const uidSelector = state => state.auth.user.id;

export const currentMenuSelector = createSelector(
  menusSelector,
  valueSelector,
  (menus, active) => menus.find(menu => menu.key === active, null, {})
);

export const isEditableSelector = createSelector(
  menusSelector,
  valueSelector,
  uidSelector,
  (menus, active, uid) => uid === menus.find(menu => menu.key === active, null, {}).memberId
);
