import React from "react";
import Logo from "../assets/images/Logo.png";
import { NavLink } from "react-router-dom";

const header = () => {

  const handleLogout = () => {
    alert ("Are You Sure LogOut !");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} width={80} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/table">
                  Table
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link KOT"
                  activeClassName="active"
                  to="/kot"
                  title="Kitchen Order Ticket"
                >
                  KOT
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/bill">
                  Billing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/about">
                  About Us
                </NavLink>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/" onClick={() => localStorage.removeItem('token')}>
                    <button onClick={handleLogout} className="logout">Logout</button>
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/login">
                   <button className="logout">Login</button> 
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default header;
