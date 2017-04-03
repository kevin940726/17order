import React, { PropTypes } from 'react';

const Modal = ({ isOpen, handleClose, title, children, handleSubmit, isSubmitting, yesText, noText }) => (
  <div className={`modal ${isOpen ? 'is-active' : ''}`}>
    <div className="modal-background" onClick={handleClose}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button className="delete" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body">
        {children}
      </section>
      <footer className="modal-card-foot">
        <a
          className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
          onClick={handleSubmit}
        >{yesText}</a>
        <a className="button" onClick={handleClose}>{noText}</a>
      </footer>
    </div>
  </div>
);

const textProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
]);

Modal.propTypes = {
  yesText: textProps,
  noText: textProps,
};

Modal.defaultProps = {
  yesText: 'Submit',
  noText: 'Cancel'
};

export default Modal;
