import React from 'react';
import SmallLabel from '../../../components/SmallLabel';
import TimeAgo from '../../../components/TimeAgo';

const MenuSelect = ({ value, handleChange, menus }) => (
  <nav className="panel">
    {menus.map(menu => (
      <a
        key={menu.key}
        className={`panel-block ${menu.key === value ? 'is-active' : ''}`}
        onClick={handleChange(menu.key)}
      >
        <p className="control">
          <span>
            {menu.name}
          </span>
          <SmallLabel className="is-pulled-right">
            <TimeAgo date={menu.timestamp} />
          </SmallLabel>
        </p>
      </a>
    ))}
  </nav>
);

export default MenuSelect;
