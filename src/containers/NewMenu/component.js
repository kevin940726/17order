import React from 'react';
import formContainer from './formContainer';
import Modal from '../../components/Modal';
import InputComponent from '../../components/Input';
import SelectComponent from '../../components/Select';
import TextAreaComponent from '../../components/TextArea';

const Input = formContainer(InputComponent);
const Select = formContainer(SelectComponent);
const TextArea = formContainer(TextAreaComponent);

const NewMenu = ({ isModalOpen, handleCloseModal, handleSubmit, handleChange, isSubmitting, channel, type }) => (
  <Modal
    isOpen={isModalOpen}
    title="New Menu"
    handleClose={handleCloseModal}
    handleSubmit={handleSubmit}
    isSubmitting={isSubmitting}
    yesText={`Post to ${channel}`}
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

    <Input label="Menu" type="file" name="file" multiple optional />

    {type === 'beverages' && (
      <div>
        <Select
          label="Size"
          options={[
            { label: 'big', value: 'big' },
            { label: 'medium', value: 'medium' },
            { label: 'small', value: 'small' },
          ]}
          name="size"
        />

        <Select
          label="Sugar"
          options={[
            { label: 'regular', value: 'regular' },
            { label: 'less', value: 'less' },
            { label: 'half', value: 'half' },
            { label: 'quarter', value: 'quarter' },
            { label: 'sugar-free', value: 'free' },
          ]}
          name="sugar"
        />

        <Select
          label="Ice/Hot"
          options={[
            { label: 'regular', value: 'regular' },
            { label: 'easy-ice', value: 'easy' },
            { label: 'ice-free', value: 'free' },
            { label: 'hot', value: 'hot' },
          ]}
          name="ice"
        />
      </div>
    )}

    <TextArea label="Note" name="notes" optional />
  </Modal>
);

export default NewMenu;
