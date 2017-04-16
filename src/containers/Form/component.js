import React from 'react';
import AutoComplete from './components/AutoComplete';
import formContainer from './formContainer';
import SelectComponent from '../../components/Select';
import { sizeDict, sugarDict, iceDict } from '../../utils/dicts';

const Select = formContainer(SelectComponent);

const Form = ({ editKey, order, handleChange, handleSelect, handleSubmit, handleEdit, handleEditCancel, type, orders }) => (
  <form onSubmit={editKey ? handleEdit : handleSubmit}>
    <div className="field">
      <label className="label">
        Order
      </label>
      <AutoComplete orders={orders} handleChange={handleChange} />
    </div>
    

    {type === 'beverages' && (
      <div className="columns">
        <div className="column">
          <Select
            label="Size"
            options={sizeDict.map((label, value) => ({
              label,
              value
            })).toArray()}
            name="size"
          />
        </div>

        <div className="column">
          <Select
            label="Sugar"
            options={sugarDict.map((label, value) => ({
              label,
              value
            })).toArray()}
            name="sugar"
          />
        </div>

        <div className="column">
          <Select
            label="Ice/Hot"
            options={iceDict.map((label, value) => ({
              label,
              value
            })).toArray()}
            name="ice"
          />
        </div>
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
