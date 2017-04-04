import React, { PropTypes } from 'react';
import formControl from './formControl'

const Select = ({ options, className, ...props }) => (
  <span className={`select ${className}`}>
    <select {...props}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </span>
);

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Select.defaultProps = {
  className: '',
};

export default formControl(Select);
