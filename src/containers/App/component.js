import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import Form from '../Form';
import NewMenu from '../NewMenu';
import Orders from '../Orders';
import Menus from '../Menus';

class App extends Component {
  constructor(props) {
    super(props);

    const { auth } = (props.location.state || { auth: {} });

    props.setAuthInfo(auth);
  }

  render() {
    const { auth, location, handleOpenNewMenuModal } = this.props;
    const isLogin = auth && auth.ok === true;

    if (!isLogin) {
      if (!location.state || !location.state.auth.ok) {
        return (<Redirect to="/login" />);
      }

      return (<div>Loging in...</div>);
    }

    return (
      <div className="container">
        <div className="box">
          <div>
            <h1>Welcome {auth.user.name} <Link to="/signout">sign out</Link></h1>

            <button className="button primary" onClick={handleOpenNewMenuModal}>
              New Menu
            </button>

            <Route exact path="/" component={Menus} />
            <Route path="/:menuId" component={Menus} />

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
