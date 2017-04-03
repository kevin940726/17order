import React, { PropTypes } from 'react';

const Select = ({ label, options, ...props }) => (
  <div className="field">
    <label className="label">{label}</label>
    <p className="control">
      <span className="select">
        <select {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </span>
    </p>
  </div>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Select;
