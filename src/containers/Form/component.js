import React from 'react';

const Form = ({ editKey, order, handleChange, handleSubmit, handleEdit, handleEditCancel }) => (
  <form onSubmit={editKey ? handleEdit : handleSubmit}>
    <div className="field">
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
    </div>

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
