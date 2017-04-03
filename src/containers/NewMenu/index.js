import { connect } from "react-redux";
import NewMenu from "./component";
import { handleSubmit, handleCloseModal } from './actions';

const mapStateToProps = state => ({
  isModalOpen: state.newMenu.isModalOpen,
  isSubmitting: state.newMenu.isSubmitting,
});

const mapDispatchToProps = dispatch => ({
  handleCloseModal() {
    dispatch(handleCloseModal());
  },

  handleSubmit(e) {
    e.preventDefault();

    dispatch(handleSubmit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMenu);
