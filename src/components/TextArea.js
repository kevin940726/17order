import React, { PropTypes } from 'react';

const TextArea = ({ label, ...props }) => (
  <div className="field">
    <label className="label">{label}</label>
    <p className="control">
      <textarea className="textarea" placeholder="Textarea" {...props} />
    </p>
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
};

export default TextArea;
