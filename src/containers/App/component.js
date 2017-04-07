import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Form from '../Form';
import NewMenu from '../NewMenu';
import Orders from '../Orders';
import Menus from '../Menus';
import { getAppLocalStorage } from '../../utils/localStorage';

class App extends Component {
  componentDidMount() {
    const { redirect, auth, authTest } = this.props;

    if (!auth || auth.ok !== true) {
      const storage = getAppLocalStorage();

      if (!storage || storage.ok !== true) {
        redirect('/login');
      } else {
        authTest(storage)
          .catch(() => redirect('/login'));
      }
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
