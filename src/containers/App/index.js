import { connect } from 'react-redux';
import App from './component';
import { setAuthInfo, authTest } from '../Auth/actions';
import { replace } from 'react-router-redux';

const mapStateToProps = state => ({
  auth: state.auth,
  routerState: state.router.location.state,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAuthInfo(auth) {
    dispatch(setAuthInfo(auth));
  },

  redirect(location) {
    dispatch(replace({
      pathname: location,
      state: ownProps.location.pathname,
    }));
  },

  authTest(localAuth) {
    return dispatch(authTest(localAuth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
