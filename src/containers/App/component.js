import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Form from '../Form';
import NewMenu from '../NewMenu';
import Orders from '../Orders';
import Menus from '../Menus';

class App extends Component {
  componentDidMount() {
    const { redirect, auth } = this.props;

    if (!auth || auth.ok !== true) {
      redirect('/login');
    }
  }

  render() {
    const { auth, handleOpenNewMenuModal } = this.props;
    const isLogin = auth && auth.ok === true;

    if (!isLogin) {
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
