import React from 'react';
import certificate from '../../assets/images/certificate.jpg';
import backgroundImage from '../../assets/images/relief-plaster-wall.jpg';
const CertificationSection = () => {
    return (
        <>
            <section className="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            {/* Uncomment the line below if you want to keep the h4 tag */}
            {/* <h4> OUR CLIENTS REVIEWS </h4> */}
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
