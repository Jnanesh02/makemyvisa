import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './HomeStyles/certification.css'
import './HomeStyles/certificationSection.css'
import certificate1 from '../../assets/images/certificate/ASSOCHAM.jpg'
import certificate2 from '../../assets/images/certificate/CERTIFICATE_OF_INCORPORATION.jpg'
import certificate3 from '../../assets/images/certificate/DIPP116571_SUMRAJ_(MAKEMYVISA)_SERVICES_PRIVATE_LIMITED_RECOGNITION_2927715445170702084.jpg'
import certificate4 from '../../assets/images/certificate/FICCI-images-3.jpg'
import certificate5 from '../../assets/images/certificate/Sri_Mohit_Khandelwal_Certificate.jpg'
import certificate6 from '../../assets/images/certificate/MSME_registration_certificate-images-01.jpg'
import certificate7 from '../../assets/images/certificate/ISO_Certificate.jpg'
import backgroundImage from "../../assets/images/certificate/relief-plaster-wall.jpg";
const CertificationSection = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 3,
    autoplay: true,
    autoplaySpeed: 2000,
   
  };
  const certificate=[certificate1,certificate2,certificate3,certificate4,certificate5,certificate6,certificate7];

  return (
    <section className="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="col-lg-12">
        <h2> ACCREDITATION </h2>
      </div>
      <Slider className="autoplay mx-auto certificate-slider mt-3" {...settings}>
      {certificate.map((certificate) => (
          <div key={certificate}> 
            <img className="certificateimg" src={certificate} alt="Certificate" />
          </div>
        ))}
       
      </Slider>
    </section>
  );
};






export default CertificationSection;



