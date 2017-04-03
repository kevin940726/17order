import React from 'react';

const Modal = ({ isOpen, handleClose, title, children, handleSubmit, isSubmitting }) => (
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
        >Save changes</a>
        <a className="button" onClick={handleClose}>Cancel</a>
      </footer>
    </div>
  </div>
);

export default Modal;
