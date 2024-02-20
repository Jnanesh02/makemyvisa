import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import googlereview from "../../assets/images/review.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";

const Navbar = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const location = useLocation();
const onLoginPage = location.pathname === "/login";
const onSignupPage = location.pathname === "/registration";
const onHomePage = location.pathname === "/";

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
    <Link className="dropdown-item" to="/logout">
      Logout
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
    <Link className="dropdown-item" to="/">
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
                <Link to="/">
                  <img className="header-logo" src={Logo} alt="Logo" />
                </Link>
              </div>
              <div className="col-lg-8 col-sm-8 col-md-8  nav-cont-b">
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
                          <Link className="nav-link" to="/services/TravelHealthInsurance">
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

                      {/* Googlereview */}
               

                     
                    </div>
                  </div>
                </nav>
               
              </div>
              <div className="col-lg-2">
              <a className="google-review-link" href="https://www.google.com/search?q=makemyvisa+bengaluru+office&sz=0&biw=1223&bih=601&sxsrf=APwXEdfOY3HgsgzHxLH3PfoTtx5JH8mu7g%3A1682505920799&ei=wABJZNevMOSfseMPi9SN-Ak&ved=0ahUKEwjXj_f9rsf-AhXkT2wGHQtqA58Q4dUDCBA&uact=5&oq=makemyvisa+bengaluru+office&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIECCMQJzoHCCMQsAMQJzoCCCZKBAhBGAFQugVYggxg8Q1oAHAAeACAAeUBiAGUCpIBBTAuNy4xmAEAoAEByAEBwAEB&sclient=gws-wiz-serp#lrd=0x3bae13c0e4d75019:0x343d6bccc4336492,1,,,,">
              <img className="header-googlwe-review" src={googlereview} alt="/"/> 
              </a>
    <div className="dropdown drp-navbar">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <img src={avatar} alt="Avatar" />
                        </button>
                        <ul className="dropdown-menu">
                          {onLoginPage && (
                            <>
                              <HomeLink></HomeLink>

        <Signup></Signup>
      </>
    )}

    {onSignupPage && (
      <>
        <HomeLink></HomeLink>

        {isLoggedIn ? <Logout></Logout> : <Login></Login>}
      </>
    )}

                          {onHomePage && (
                            <>
                              <Signup></Signup>
                              <Login></Login>
                            </>
                          )}
                        </ul>
                      </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </main>
  );
};

export default Navbar;
