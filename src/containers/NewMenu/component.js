import React from 'react';
import formContainer from './formContainer';
import Modal from '../../components/Modal';
import InputComponent from '../../components/Input';
import SelectComponent from '../../components/Select';
import TextAreaComponent from '../../components/TextArea';

const Input = formContainer(InputComponent);
const Select = formContainer(SelectComponent);
const TextArea = formContainer(TextAreaComponent);

const NewMenu = ({ isModalOpen, handleCloseModal, handleSubmit, handleChange, isSubmitting }) => (
  <Modal
    isOpen={isModalOpen}
    title="New Menu"
    handleClose={handleCloseModal}
    handleSubmit={handleSubmit}
    isSubmitting={isSubmitting}
  >
    <Select
      label="Type"
      options={[
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Beverages', value: 'beverages' },
      ]}
      name="type"
    />

    <Input label="Name" placeholder="7-11" name="name" />

    <Input label="Menu" type="file" name="file" />

    <TextArea label="Note" name="notes" />
  </Modal>
);

export default NewMenu;
