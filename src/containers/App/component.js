import React, { Component } from 'react';
import Form from '../Form';
import SignInButton from '../../components/SlackSignInButton';
import Orders from '../Orders';

class App extends Component {
  componentDidMount() {
    const { auth } = (this.props.location.state || { auth: {} });

    if (auth && auth.ok === true) {
      this.props.setAuthInfo(auth);
    }
  }

  render() {
    const { auth } = this.props;
    const isLogin = auth && auth.ok === true;

    return (
      <div className="container">
        <div className="box">
          {!isLogin && (<SignInButton />)}

          {isLogin && (
            <h1>Welcome {auth.user.name}</h1>
          )}

          {isLogin && (
            <Form />
          )}

          <Orders />
        </div>
      </div>
    );
  }
}

export default App;
