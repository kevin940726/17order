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

    <div className="nav-right">
      <span className="nav-item">
        <span>{auth.user.name}</span>
        <Link className="button is-link" to="/signout">
          <span>Sign Out</span>
        </Link>
      </span>
    </div>
  </nav>
);

export default Nav;
