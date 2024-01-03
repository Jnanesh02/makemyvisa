// Navbar.jsx
import React from "react";
import "./Navbar.css";
import Logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <section className="header-section">
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
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-list">
                      <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">
                          Visa
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/travel" className="nav-link">
                          Travel ItineraryInsurance
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/apostille" className="nav-link">
                          Apostille & Attestation
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/study" className="nav-link">
                          Study/Admission
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/contact" className="nav-link">
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
                        <img src={avatar} alt="User Avatar" />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/action" className="dropdown-item">
                            Action
                          </Link>
                        </li>
                        <li>
                          <Link to="/another-action" className="dropdown-item">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link to="/something-else" className="dropdown-item">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
