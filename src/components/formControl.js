import React from 'react';
import SmallLabel from './SmallLabel';

const formControl = Component => class FormControl extends React.Component {
  render() {
    const { label, type, optional, errorMessage, ...props } = this.props;

    return (
      <div className="field">
        <label className="label">
          {label}
          {optional && (
            <SmallLabel>optional</SmallLabel>
          )}
        </label>
        <p className="control">
          <Component className={errorMessage ? 'is-danger' : ''} {...props} />
        </p>
        {errorMessage ? (
          <p className="help is-danger">{errorMessage}</p>
        ) : null}
      </div>
    );
  }
};

export default formControl;
