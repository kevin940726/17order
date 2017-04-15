import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ auth }) => (
  <nav className="nav has-shadow">
    <div className="nav-left">
      <Link className="nav-item" to="/">
        <h1 className="title">
          17 Order
        </h1>
      </Link>
    </div>

    <div className="nav-right nav-menu">
      <span className="nav-item">
        {auth.user.name}
      </span>
      <span className="nav-item">
        <Link className="button" to="/signout">
          <span>Sign Out</span>
        </Link>
      </span>
    </div>
  </nav>
);

export default Nav;
