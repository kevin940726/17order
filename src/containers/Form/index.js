import { connect } from 'react-redux';
import Form from './component';
import { handleChange, handleSubmit } from './actions';

const mapStateToProps = state => ({
  order: state.form.order,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
