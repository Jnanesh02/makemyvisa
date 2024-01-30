import React from "react";
import Logo from "../../assets/images/logo.png";

import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-start">
      {" "}
      {/* Add text-start class to align text to the left */}
      <div className="row">
        <div className="col-lg-3">
          <img className="footer-logo" src={Logo} alt="" />
          <h5> ----- About Us </h5>
          <h3> Makemyvisa </h3>
          <p className="footer-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="col-lg-2 footer-list">
          <h5 className="footer-menu-one"> Migrate </h5>
          <ul className="list-unstyled text-small footer-list ">
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Canada
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                United States
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                United Kingdom
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Australia
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Ireland
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                European-Schengen
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-2 footer-list">
          <h5 className="footer-menu-one"> Sitemap </h5>
          <ul className="list-unstyled text-small footer-list">
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Home
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                About Us
              </a>
            </li>
            <li className="mb-1">
              <NavLink className="link-secondary text-decoration-none" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Enquiry
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-2 footer-list">
          <h5 className="footer-menu-one"> Services </h5>
          <ul className="list-unstyled text-small footer-list">
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Fight Tickets
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Hotel Bookings
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Travel Insurance
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Apostille/Attestation
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Forex Services
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-3 footer-list ">
          <h5 className="footer-menu-one"> Connect with us </h5>
          <ul className="list-unstyled text-small footer-list">
            <li className="mb-1">
            <i class="fas fa-phone m-1"></i>
              <a className="link-secondary text-decoration-none" href="/">
              
              +91 9818602259
              </a>
            </li>
            <li className="mb-1">
            <i class="fas fa-globe m-1"></i> 
              <a className="link-secondary text-decoration-none" href="/">
              
              www.makemyvisa.co
              </a>
            </li>
            <li className="mb-1">
            <i class="fas fa-map-marker-alt m-1"></i>
              <a className="link-secondary text-decoration-none" href="/">
              
              HD-053, We Work Embassy Tech Village, Bellandur, Bengaluru - 50610, Karnataka
              </a>
            </li>
            <li className="mb-1">
            <i class="fas fa-envelope m-1"></i>
              <a className="link-secondary text-decoration-none" href="/">
              
              info@makemyvisa.co
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <p className="m-1">
          <strong>&copy; 2024 Copyright:</strong> Make My Visa
        </p>

        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </div>
      <hr />
      <div className="footer-last">
        <p>Privacy</p>
        <p>Terms</p>
        <p>Cancellation</p>
        <p>Cookies</p>
      </div>
    </footer>
  );
};

export default Footer;
