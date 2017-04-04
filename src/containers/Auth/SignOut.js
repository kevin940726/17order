import React, { PureComponent } from 'react';
import firebase from 'firebase';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

class SignOut extends PureComponent {
  state = {
    isSigningOut: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    firebase.auth()
      .signOut()
      .then(() => {
        // this.setState({ isSigningOut: false });
        dispatch(replace('/login'));
      });
  }

  render() {
    // const { isSigningOut } = this.state;

    // if (isSigningOut) {
    return (<div>Signing out...</div>);
    // }

    // return (
    //   <Redirect to="/login" />
    // );
  }
}

export default connect()(SignOut);
