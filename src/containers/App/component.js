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
    const { auth } = this.props;
    const isLogin = auth && auth.ok === true;

    if (!isLogin) {
      return (<div>Loging in...</div>);
    }

    return (
      <div>
        <Nav auth={auth} />

        <Wrapper className="container">
          <CurrentMenu />

          <div className="tile is-ancestor">
            <div className="tile">
              <div className="tile is-parent is-8">
                <div className="tile is-child box">
                  <Form />
                  <NewMenu />
                </div>
              </div>

              <div className="tile is-parent">
                <div className="tile is-child box">
                  <Switch>
                    <Route exact path="/" component={Menus} />
                    <Route path="/:menuId" component={Menus} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <Orders />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
