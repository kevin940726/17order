import { connect } from 'react-redux';
import App from './component';
import { setAuthInfo } from '../Auth/actions';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setAuthInfo(auth) {
    dispatch(setAuthInfo(auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
