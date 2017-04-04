import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { parse } from 'query-string';

class AuthRedirect extends Component {
  state = {
    auth: {},
    isError: false,
    err: '',
  };

  componentDidMount() {
    const code = (parse(this.props.location.search) || {}).code;

    fetch(`https://41mmepe4yc.execute-api.ap-northeast-1.amazonaws.com/latest/auth?code=${code}`)
      .then(res => res.json())
      .then(payload => {
        console.log(payload); // eslint-disable-line no-console
        this.setState({ auth: payload });
      })
      .catch(err => {
        this.setState({
          isError: true,
          err,
        });
      });
  }

  render() {
    const { auth, isError, err } = this.state;

    if (auth && auth.ok === true) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { auth },
          }}
        />
      );
    }

    const message = isError ? (<p>{err}</p>) : (<p>Loading...</p>);

    return (
      <div>
        {message}
      </div>
    );
  }
}

export default AuthRedirect;
