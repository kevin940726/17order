import { connect } from 'react-redux';
import { handleChange } from './actions';

const mapStateToProps = (state, ownProps) => ({
  value: state.newMenu[ownProps.name],
});

const mapDispatchToProps = (dispatch) => ({
  onChange(e) {
    const { name, value } = e.target;

    dispatch(handleChange(name, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
