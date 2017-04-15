import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import CurrentMenu from './component';
import { MENUS_LIST } from '../Menus/constants';
import { handleRemove } from './actions';
import { editMenu } from '../NewMenu/actions';

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

const mapStateToProps = state => ({
  menu: currentMenuSelector(state),
  isEditable: isEditableSelector(state),
});

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMenu);
