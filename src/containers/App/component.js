import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';
import SignInButton from '../../components/SlackSignInButton';
import Orders from '../Orders';

class App extends Component {
  componentDidMount() {
    const { auth } = (this.props.location.state || { auth: {} });

    this.props.setAuthInfo(auth);
  }

  render() {
    const { auth } = this.props;
    const isLogin = auth && auth.ok === true;

    return (
      <div className="container">
        <div className="box">
          {!isLogin && (<SignInButton />)}

          {isLogin && (
            <div>
              <h1>Welcome {auth.user.name} <Link to="/signout">sign out</Link></h1>
              <Form />
            </div>
          )}

          <Orders />
        </div>
      </div>
    );
  }
}

export default App;
