import { connect } from 'react-redux';
import Menus from './component';
import { handleChange } from './actions';
import { MENUS_LIST } from './constants';

const mapStateToProps = state => ({
  menus: state.menus[MENUS_LIST],
  value: state.menus.active,
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    dispatch(handleChange(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
