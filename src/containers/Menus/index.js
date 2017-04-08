import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Menus from './component';
import { handleChange, handleRemove, getMenus } from './actions';
import { editMenu } from '../NewMenu/actions';
import { MENUS_LIST } from './constants';

const menusSelector = state => state.menus[MENUS_LIST];
const valueSelector = state => state.menus.active;
const uidSelector = state => state.auth.user.id;

const currentMenuSelector = createSelector(
  menusSelector,
  valueSelector,
  (menus, active) => menus.find(menu => menu.key === active, null, {})
);

const isEditableSelector = createSelector(
  menusSelector,
  valueSelector,
  uidSelector,
  (menus, active, uid) => uid === menus.find(menu => menu.key === active, null, {}).memberId
);

const mapStateToProps = (state, ownProps) => ({
  menus: menusSelector(state),
  value: valueSelector(state),
  active: ownProps.match.params && ownProps.match.params.menuId,
  currentMenu: currentMenuSelector(state),
  isEditable: isEditableSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMenus() {
    dispatch(getMenus(ownProps.match.params));
  },

  handleChange(e) {
    dispatch(handleChange(e.target.value));
  },

  handleEdit(e) {
    e.preventDefault();

    dispatch(editMenu());
  },

  handleRemove(e) {
    if (e) {
      e.preventDefault();
    }

    dispatch(handleRemove());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
