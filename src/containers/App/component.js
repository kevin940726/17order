import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';
import SignInButton from '../../components/SlackSignInButton';
import AddToSlackButton from '../../components/AddToSlackButton';
import NewMenu from '../NewMenu';
import Orders from '../Orders';
import Menus from '../Menus';

class App extends Component {
  componentDidMount() {
    const { auth } = (this.props.location.state || { auth: {} });

    this.props.setAuthInfo(auth);
  }

  render() {
    const { auth, handleOpenNewMenuModal } = this.props;
    const isLogin = auth && auth.ok === true;

    if (!isLogin) {
      return (<SignInButton />);
    }

    return (
      <div className="container">
        <div className="box">
          <div>
            <h1>Welcome {auth.user.name} <Link to="/signout">sign out</Link></h1>

            <button className="button primary" onClick={handleOpenNewMenuModal}>
              New Menu
            </button>

            <Menus />

            <Form />
          </div>

          <Orders />
        </div>

        <NewMenu />
      </div>
    );
  }
}

export default App;
