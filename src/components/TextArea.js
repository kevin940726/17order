import React, { PropTypes } from 'react';
import formControl from './formControl';

const TextArea = ({ className, ...props }) => (
  <textarea
    className={`textarea ${className}`}
    {...props}
  />
);

TextArea.propTypes = {
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
};

export default formControl(TextArea);
