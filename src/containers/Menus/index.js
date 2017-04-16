import { connect } from 'react-redux';
import Menus from './component';
import { handleChange, getMenus, expandMenus } from './actions';
import { handleOpenModal as handleOpenNewMenuModal } from '../NewMenu/actions';
import { MENUS_LIST } from './constants';

const mapStateToProps = (state, ownProps) => ({
  menus: state.menus[MENUS_LIST],
  value: state.menus.active,
  active: ownProps.match.params && ownProps.match.params.menuId,
  isExpanded: state.menus.isExpanded,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMenus() {
    dispatch(getMenus(ownProps.match.params));
  },

  handleChange(menuId) {
    return (e) => {
      if (e) {
        e.preventDefault();
      }

      dispatch(handleChange(menuId));
    }
  },

  expandMenus() {
    dispatch(expandMenus());
  },

  handleOpenNewMenuModal() {
    dispatch(handleOpenNewMenuModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
