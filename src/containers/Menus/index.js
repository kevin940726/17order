import { connect } from 'react-redux';
import Menus from './component';
import { handleChange, getMenus } from './actions';
import { MENUS_LIST } from './constants';

const mapStateToProps = (state, ownProps) => ({
  menus: state.menus[MENUS_LIST],
  value: state.menus.active,
  active: ownProps.match.params && ownProps.match.params.menuId,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
