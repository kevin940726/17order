import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignInButton from '../../components/SlackSignInButton';

const Login = ({ auth }) => (
  <div>
    {auth.error && (
      <div className="content">
        <h1>{auth.code}</h1>
        <p>{auth.message}</p>
      </div>
    )}
    <SignInButton />
  </div>
);

Login.propTypes = {
  auth: PropTypes.object,
};

Login.defaultProps = {
  auth: {}
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
