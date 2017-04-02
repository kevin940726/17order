import { connect } from 'react-redux';
import Form from './component';
import { handleChange, handleSubmit, handleEdit, handleEditCancel } from './actions';

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

  handleEdit(e) {
    e.preventDefault();

    dispatch(handleEdit());
  },

  handleEditCancel(e) {
    e.preventDefault();

    dispatch(handleEditCancel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
