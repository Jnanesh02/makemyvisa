import React from "react";
import Logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-sm-4 col-md-4 col">
            <img className="header-logo" src={Logo} alt="Logo" />
          </div>
          <div className="col-lg-10 col-sm-8 col-md-8  nav-cont-b">
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-section">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-list">
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Visa
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Travel ItineraryInsurance
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Apostille & Attestation
                      </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <div className="dropdown drp-navbar">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={avatar} alt="Avatar" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
