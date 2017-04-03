import React, { PureComponent } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SignOut extends PureComponent {
  state = {
    isSigningOut: true,
  };

  componentDidMount() {
    firebase.auth()
      .signOut()
      .then(() => {
        this.setState({ isSigningOut: false });
      });
  }

  render() {
    const { isSigningOut } = this.state;

    if (isSigningOut) {
      return (<div>Signing out...</div>);
    }

    return (
      <Redirect to="/" />
    );
  }
}

export default connect()(SignOut);