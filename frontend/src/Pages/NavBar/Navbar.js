import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onSignup, setOnSignup] = useState(false);
  const [onLogin, setOnLogin] = useState(false);
  

  const Login = () => {
    // setIsLoggedIn(true);
    return (
      <Link className="dropdown-item" to="/login">
        Login
      </Link>
    );
  };
  const Logout = () => {
    // setIsLoggedIn(false);
    return (
      <Link className="dropdown-item" to="/">
        Logout
      </Link>
    );
  };
  const DashboardLink = () => {
    return (
      <Link className="dropdown-item" to="/dashboard">
        Dashboard
      </Link>
    );
  };
  const Signup = () => {
    return (
      <Link className="dropdown-item" to="/registration">
        signup
      </Link>
    );
  };

  const HomeLink = () => {
    return (
      <Link className="dropdown-item" to="/home">
        Home
      </Link>
    );
  };
  return (
    <main className="content">
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
                      aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-list">
                        <li className="nav-item">
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/visa">
                            {" "}
                            Visa{" "}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/travel">
                            {" "}
                            Travel ItineraryInsurance
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/aa">
                            {" "}
                            Apostille & Attestation{" "}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/study">
                            {" "}
                            Study/Admission{" "}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/contactus">
                            {" "}
                            Contact Us{" "}
                          </Link>
                        </li>
                      </ul>
                      <div className="dropdown drp-navbar">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <img src={avatar} alt="Avatar" />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            {isLoggedIn ? (
                              <DashboardLink></DashboardLink>
                            ) : (
                              <Signup></Signup>
                            )}
                          </li>
                          <li>
                            {isLoggedIn ? <Logout></Logout> : <Login></Login>}
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
    </main>
  );
};

export default Navbar;
