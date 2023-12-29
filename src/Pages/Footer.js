import React from "react";
import Logo from "../assets/images/logo.png";

import "./Footer.css";
const Footer = () => {
  return (
    <footer className="">
      <div className="row">
        <div className="col-lg-3">
          <img className="footer-logo" src={Logo} alt="" />
          <h5> ----- About Us </h5>
          <h3> Makemyvisa </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="col-lg-2">
          <h5 className="footer-menu-one"> Migrate </h5>
          <ul className="list-unstyled text-small footer-list">
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
        <div className="col-lg-2">
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
              <a className="link-secondary text-decoration-none" href="/">
                Contact
              </a>
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
        <div className="col-lg-2">
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
        <div className="col-lg-2">
          <h5 className="footer-menu-one"> Connect with us </h5>
          <ul className="list-unstyled text-small footer-list">
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Team
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Locations
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Privacy
              </a>
            </li>
            <li className="mb-1">
              <a className="link-secondary text-decoration-none" href="/">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
