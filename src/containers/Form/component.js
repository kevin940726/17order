import React from 'react';
import formContainer from './formContainer';
import InputComponent from '../../components/Input';
import SelectComponent from '../../components/Select';

const Select = formContainer(SelectComponent);
const Input = formContainer(InputComponent);

const Form = ({ editKey, order, handleChange, handleSubmit, handleEdit, handleEditCancel, type }) => (
  <form onSubmit={editKey ? handleEdit : handleSubmit}>
    <Input
      label="Order"
      name="order"
      placeholder="Place your order"
    />
    {/*<div className="field">
      <label className="label">Order</label>
      <p className="control">
        <input
          className="input"
          type="text"
          placeholder="Text input"
          name="order"
          value={order}
          onChange={handleChange}
        />
      </p>
    </div>*/}

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

    <div className="field is-grouped">
      <p className="control">
        <button type="submit" className="button is-primary">Submit</button>
      </p>
      {editKey ? (
        <p className="control">
          <button className="button is-link" onClick={handleEditCancel}>Cancel</button>
        </p>
      ): null}
    </div>
  </form>
);

export default Form;
