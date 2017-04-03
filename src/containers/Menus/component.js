import React from 'react';
import { TODAY } from '../../utils/constants';

const Menus = ({ menus, value, handleChange }) => (
  <div className="field">
    <label className="label">Select a menu</label>
    <p className="control">
      <span className="select">
        <select value={value} onChange={handleChange}>
          {menus.groupBy(menu => menu.date)
            .map((group, date) => (
              <optgroup label={date === TODAY ? 'Today' : date} key={date}>
                {group.map(menu => (
                  <option key={menu.key} value={menu.key}>{menu.name}</option>
                ))}
              </optgroup>
            )).toList()}
        </select>
      </span>
    </p>
  </div>
);

export default Menus;
