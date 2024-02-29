import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './HomeStyles/certification.css'
const CertificationSection = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <button className="slick-prev" style={{ backgroundColor: 'red' }}>Previous</button>,
    nextArrow: <button className="slick-next" style={{ backgroundColor: 'red' }}>Next</button>
  };

  return (
    <Slider className="autoplay w-50 mx-auto" {...settings}>
      <div className=''>
        <img src="https://picsum.photos/300/200?random=1" alt="Slide 1" />
      </div>
      <div>
        <img src="https://picsum.photos/300/200?random=2" alt="Slide 2" />
      </div>
      <div>
        <img src="https://picsum.photos/300/200?random=3" alt="Slide 3" />
      </div>
      <div>
        <img src="https://picsum.photos/300/200?random=4" alt="Slide 4" />
      </div>
      <div>
        <img src="https://picsum.photos/300/200?random=5" alt="Slide 5" />
      </div>
    </Slider>
  );
};

export default CertificationSection;



