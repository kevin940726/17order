import { connect } from 'react-redux';
import CurrentMenu from './component';
import { handleRemove } from './actions';
import { editMenu } from '../NewMenu/actions';
import { currentMenuSelector, isEditableSelector } from './selectors';

const mapStateToProps = state => ({
  menu: currentMenuSelector(state),
  isEditable: isEditableSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleEdit(e) {
    e.preventDefault();

    dispatch(editMenu());
  },

  handleRemove(e) {
    if (e) {
      e.preventDefault();
    }

    dispatch(handleRemove());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMenu);
