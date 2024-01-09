import React from 'react';
import certificate from '../../assets/images/certificate.jpg';
import backgroundImage from '../../assets/images/relief-plaster-wall.jpg';
import "./Home.css";
const CertificationSection = () => {
    return (
        <>
            <section className="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2> ACCREDITATION </h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <img className="certificate-img" src={certificate} alt="Certificate 1" />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <img className="certificate-img" src={certificate} alt="Certificate 2" />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <img className="certificate-img" src={certificate} alt="Certificate 3" />
            </div>
          </div>
        </div>
      </div>
    </section> 
        </>
    );
}

export default CertificationSection;
