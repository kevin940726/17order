import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { parse } from 'query-string';
import { setAuthInfo } from './actions';

class AuthRedirect extends Component {
  state = {
    isError: false,
    err: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { code, state } = parse(this.props.location.search) || {};

    fetch(`https://41mmepe4yc.execute-api.ap-northeast-1.amazonaws.com/latest/auth?code=${code}`)
      .then(res => res.json())
      .then(async (auth) => {
        console.log(auth); // eslint-disable-line no-console
        await dispatch(setAuthInfo(auth));
        dispatch(replace({
          pathname: state || '/',
          state: { auth },
        }));
      })
      .catch(err => {
        this.setState({
          isError: true,
          err,
        });
      });
  }

  render() {
    const { isError, err } = this.state;
    const message = isError ? (<p>{err.toString()}</p>) : (<p>Loading...</p>);

    return (
      <div>
        {message}
      </div>
    );
  }
}

export default connect()(AuthRedirect);
