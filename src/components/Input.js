import React, { PropTypes } from 'react';
import formControl from './formControl';

const Input = ({ type, className, ...props }) => (
  <input
    className={`input ${className}`}
    type={type}
    {...props}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  className: '',
};

export default formControl(Input);
