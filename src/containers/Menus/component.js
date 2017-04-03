import React from 'react';
import Select from '../../components/Select';

const Menus = ({ menus, value, handleChange }) => (
  <Select
    label="Select a menu"
    options={menus}
    value={value}
    onChange={handleChange}
  />
);

export default Menus;
