import React,{useState,useEffect} from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import image from "../../assets/images/logo.png"
import "./Footer.css"
// Constants
const contactInfo = {
  phone: "+91 9818602259",
  website: "www.makemyvisa.co",
  address: "HD-053, We Work Embassy Tech Village, Bellandur, Bengaluru - 50610, Karnataka",
  email: "info@makemyvisa.co",
};

// Icon components
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
  </svg>
);

const AddressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/>
  </svg>
);

// Subcomponents
const ContactDetail = ({ icon, text }) => (
  <li className="mb-1 footer-address">
    <a className="link-secondary text-decoration-none" href="/">
      {icon}
      {text}
    </a>
  </li>
);

const Column = ({ title, items }) => (
  <div className="col-lg-2">
    <h5 className="footer-menu-one">{title}</h5>
    <ul className="list-unstyled text-small footer-list">
      {items.map((item, index) => (
        <li className="mb-1" key={index}>
          <NavLink to={`/countries/${item.label}`} className="link-secondary text-decoration-none">
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

// Main Footer component
const Footer = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
        if (response.status === 200) {
          if(response.data.message === "No countries found"){
            setCountriesData([])
          }
          setCountriesData(response.data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCountries();
  }, []);
  const migrateItems = countriesData.map(country =>({
    label:country.countryName,
  }));

  const sitemapItems = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/" },
    { label: "Contact", link: "/" },
    { label: "Enquiry", link: "/" },
    { label: "Blog", link: "/" },
  ];

  const servicesItems = [
    { label: "Flight Tickets", link: "/" },
    { label: "Hotel Bookings", link: "/" },
    { label: "Travel Insurance", link: "/" },
    { label: "Apostille/Attestation ", link: "/" },
    { label: "Forex Services", link: "/" },

  ];

  return (
    <footer className="">
      <div className="row">
        {/* About Us column */}
        <div className="col-lg-3">
            <img className="footer-logo" src={image} alt=""/>
            <h5> ----- About Us </h5>
            <h3> Makemyvisa </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
          </div>

        {/* Migrate column */}
        <Column title="Migrate" items={migrateItems} />

        {/* Sitemap column */}
        <Column title="Sitemap" items={sitemapItems} />

        {/* Services column */}
        <Column title="Services" items={servicesItems} />

        {/* Connect with us column */}
        <div className="col-lg-2">
          <h5 className="footer-menu-one address">Connect with us</h5>
          <ul className="list-unstyled text-small footer-list">
            <ContactDetail icon={<PhoneIcon />} text={contactInfo.phone} />
            <ContactDetail icon={<WebsiteIcon />} text={contactInfo.website} />
            <ContactDetail icon={<AddressIcon />} text={contactInfo.address} />
            <ContactDetail icon={<EmailIcon />} text={contactInfo.email} />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
