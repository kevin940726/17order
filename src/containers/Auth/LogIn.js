import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignInButton from '../../components/SlackSignInButton';
import AddToSlackButton from '../../components/AddToSlackButton';

const Login = ({ auth, location }) => {
  // if (!auth.error) {
  //   // directly redirect to slack login if there is no error)
  //   window.location.href = `${signInUrl}&state=${location.state || ''}`;
  // }

  return (
    <div>
      {auth.error && (
        <div className="content">
          <h1>{auth.code}</h1>
          <p>{auth.message}</p>
        </div>
      )}
      <SignInButton state={location.state} />
      <AddToSlackButton />
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,
};

Login.defaultProps = {
  auth: {},
  location: {},
};

const mapStateToProps = state => ({
  auth: state.auth,
  location: state.router.location,
});

export default connect(mapStateToProps)(Login);
