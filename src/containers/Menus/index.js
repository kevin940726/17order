import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Menus from './component';
import { handleChange, handleEdit, handleRemove } from './actions';
import { MENUS_LIST } from './constants';

const menusSelector = state => state.menus[MENUS_LIST];
const valueSelector = state => state.menus.active;
const uidSelector = state => state.auth.user.id;

const isEditableSelector = createSelector(
  menusSelector,
  valueSelector,
  uidSelector,
  (menus, active, uid) => uid === menus.find(menu => menu.key === active, null, {}).memberId
);

const mapStateToProps = state => ({
  menus: state.menus[MENUS_LIST],
  value: state.menus.active,
  isEditable: isEditableSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    dispatch(handleChange(e.target.value));
  },

  handleEdit(e) {
    e.preventDefault();

    dispatch(handleEdit());
  },

  handleRemove(e) {
    if (e) {
      e.preventDefault();
    }

    dispatch(handleRemove());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
