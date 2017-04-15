import React from 'react';
import formContainer from './formContainer';
import InputComponent from '../../components/Input';
import SelectComponent from '../../components/Select';
import { sizeDict, sugarDict, iceDict } from '../../utils/dicts';

const Select = formContainer(SelectComponent);
const Input = formContainer(InputComponent);

const Form = ({ editKey, order, handleChange, handleSubmit, handleEdit, handleEditCancel, type }) => (
  <form onSubmit={editKey ? handleEdit : handleSubmit}>
    <Input
      label="Order"
      name="order"
      placeholder="Place your order"
    />

    {type === 'beverages' && (
      <div>
        <Select
          label="Size"
          options={sizeDict.map((label, value) => ({
            label,
            value
          })).toArray()}
          name="size"
        />

        <Select
          label="Sugar"
          options={sugarDict.map((label, value) => ({
            label,
            value
          })).toArray()}
          name="sugar"
        />

        <Select
          label="Ice/Hot"
          options={iceDict.map((label, value) => ({
            label,
            value
          })).toArray()}
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
