import React from "react";
import { Link } from "react-router-dom";

import "../css/App.css";

export const Navbar = () => {

  return (
    <div>
      <nav className="navbar-container">
        <ul className="nav">
          <li>
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="nav-links">
              Watch-List
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};
