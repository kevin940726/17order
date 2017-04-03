import React, { PropTypes } from 'react';

const Input = ({ label, type, ...props }) => (
  <div className="field">
    <label className="label">{label}</label>
    <p className="control">
      <input
        className="input"
        type={type}
        {...props}
      />
    </p>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
