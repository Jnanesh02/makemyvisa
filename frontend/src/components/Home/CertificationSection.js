import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './HomeStyles/certification.css'
import './HomeStyles/certificationSection.css'
import certificate1 from '../../assets/images/certificate/ASSOCHAM.jpg'
import certificate2 from '../../assets/images/certificate/CERTIFICATE_OF_INCORPORATION.jpg'
import certificate3 from '../../assets/images/certificate/DIPP116571_SUMRAJ_(MAKEMYVISA)_SERVICES_PRIVATE_LIMITED_RECOGNITION_2927715445170702084 (1).jpg'
import certificate4 from '../../assets/images/certificate/FICCI-images-1.jpg'
import certificate5 from '../../assets/images/certificate/FICCI-images-2.jpg'
import certificate6 from '../../assets/images/certificate/FICCI-images-3.jpg'
import certificate7 from '../../assets/images/certificate/ISO_Certificate.jpg'
import certificate8 from '../../assets/images/certificate/MSME_registration_certificate-images-1.jpg'
import certificate9 from '../../assets/images/certificate/MSME_registration_certificate-images-2.jpg'
import certificate10 from '../../assets/images/certificate/Sri_Mohit_Khandelwal_Certificate.jpg'
import backgroundImage from "../../assets/images/certificate/relief-plaster-wall.jpg";
const CertificationSection = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 3,
    autoplay: true,
    autoplaySpeed: 2000,
   
  };

  return (
    <section className="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="col-lg-12">
        <h2> ACCREDITATION </h2>
      </div>
      <Slider className="autoplay mx-auto certificate-slider mt-3" {...settings}>
        <div>
          <img className='certificateimg' src={certificate1} alt="Slide 1" />
        </div>
        <div>
          <img className='certificateimg' src={certificate2} alt="Slide 2" />
        </div>
        <div>
          <img className='certificateimg' src={certificate3} alt="Slide 3" />
        </div>
        <div>
          <img className='certificateimg' src={certificate4} alt="Slide 4" />
        </div>
        <div>
          <img className='certificateimg' src={certificate5} alt="Slide 5" />
        </div>
        <div>
          <img className='certificateimg' src={certificate6} alt="Slide 6" />
        </div>
        <div>
          <img className='certificateimg' src={certificate7} alt="Slide 7" />
        </div>
        <div>
          <img className='certificateimg' src={certificate8} alt="Slide 8" />
        </div>
        <div>
          <img className='certificateimg' src={certificate9} alt="Slide 9" />
        </div>
        <div>
          <img className='certificateimg' src={certificate10} alt="Slide 10" />
        </div>
      </Slider>
    </section>
  );
};






export default CertificationSection;



