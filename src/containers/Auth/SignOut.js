import React, { PureComponent } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { removeAppLocalStorage } from '../../utils/localStorage';
import { setAuthInfo } from '../Auth/actions';

class SignOut extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    removeAppLocalStorage();

    firebase.auth()
      .signOut()
      .then(() => {
        dispatch(setAuthInfo({
          error: true,
          code: 'You have signed out',
        }));
        dispatch(replace('/login'));
      });
  }

  render() {
    return (<div>Signing out...</div>);
  }
}

export default connect()(SignOut);
