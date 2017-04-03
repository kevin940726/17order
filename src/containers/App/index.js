import { connect } from 'react-redux';
import App from './component';
import { setAuthInfo } from '../Auth/actions';
import { handleOpenModal as handleOpenNewMenuModal } from '../NewMenu/actions';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setAuthInfo(auth) {
    dispatch(setAuthInfo(auth));
  },

  handleOpenNewMenuModal() {
    dispatch(handleOpenNewMenuModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
