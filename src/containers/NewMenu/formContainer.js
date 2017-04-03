import { connect } from 'react-redux';
import { handleChange } from './actions';

const mapStateToProps = (state, ownProps) => ({
  value: ownProps.type === 'file' ? undefined : state.newMenu.fields[ownProps.name],
});

const mapDispatchToProps = (dispatch) => ({
  onChange(e) {
    const { name, value, type, files } = e.target;

    let val = value;

    if (type === 'file') {
      val = files;
    }

    dispatch(handleChange(name, val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
