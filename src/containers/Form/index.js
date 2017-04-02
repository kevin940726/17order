import { connect } from 'react-redux';
import Form from './component';
import { handleChange, handleSubmit, handleEdit } from './actions';

const mapStateToProps = state => ({
  order: state.form.order,
  editKey: state.form.editKey,
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    const { name, value } = e.target;
    dispatch(handleChange(name, value));
  },

  handleSubmit(e) {
    e.preventDefault();

    dispatch(handleSubmit());
  },

  handleEdit(key) {
    return (e) => {
      e.preventDefault();

      dispatch(handleEdit(key));
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
