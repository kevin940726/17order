import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Wrapper from './components/Wrapper';
import Form from '../Form';
import NewMenu from '../NewMenu';
import Orders from '../Orders';
import Menus from '../Menus';
import CurrentMenu from '../CurrentMenu';
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
      <div>
        <Nav auth={auth} />

        <Wrapper className="container">
          <CurrentMenu />

          <div className="columns">
            <div className="column is-two-thirds">
              <div className="box">
                <Form />
                <Orders />
                <NewMenu />
              </div>
            </div>

            <div className="column">
              <div className="box">
                <button className="button primary" onClick={handleOpenNewMenuModal}>
                  New Menu
                </button>

                <Switch>
                  <Route exact path="/" component={Menus} />
                  <Route path="/:menuId" component={Menus} />
                </Switch>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
