import { connect } from "react-redux";
import NewMenu from "./component";
import { handleSubmit, handleCloseModal, validateForm } from './actions';

const mapStateToProps = state => ({
  isModalOpen: state.newMenu.isModalOpen,
  isSubmitting: state.newMenu.isSubmitting,
  channel: state.auth.webhook.channel,
  isEditing: state.newMenu.isEditing,
});

const mapDispatchToProps = dispatch => ({
  handleCloseModal() {
    dispatch(handleCloseModal());
  },

  handleSubmit(e) {
    e.preventDefault();

    if (dispatch(validateForm())) {
      dispatch(handleSubmit());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMenu);
