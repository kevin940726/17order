import { connect } from 'react-redux';
import Menus from './component';
import { handleChange } from './actions';

const mapStateToProps = state => ({
  menus: state.menus.menus.map(menu => ({
    label: menu.name,
    value: menu.key,
  })).toJS(),
  value: state.menus.active,
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    dispatch(handleChange(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
