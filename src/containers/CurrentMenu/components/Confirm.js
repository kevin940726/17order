import React from 'react';
import Modal from '../../../components/Modal';
import modalContainer from '../../../components/modalContainer';

const Confirm = ({ isOpen, handleSubmit, handleClose }) => (
  <Modal
    title="Confirm Delete"
    isOpen={isOpen}
    handleClose={handleClose}
    handleSubmit={handleSubmit}
    yesText="Delete"
    noText="Cancel"
  >
    Are you sure you want to delete this menu?
  </Modal>
);

export default modalContainer(Confirm);
