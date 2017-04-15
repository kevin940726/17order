import React from 'react';
import Modal from '../../../components/Modal';

const Confirm = ({ isOpen, handleConfirm, handleClose }) => (
  <Modal
    title="Confirm Delete"
    isOpen={isOpen}
    handleClose={handleClose}
    handleSubmit={handleConfirm}
    yesText="Delete"
    noText="Cancel"
  >
    Are you sure you want to delete this menu?
  </Modal>
);

export default Confirm;
