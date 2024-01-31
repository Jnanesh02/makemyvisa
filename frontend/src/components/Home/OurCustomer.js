import React from 'react';
import company1 from "../../assets/images/clients/01.png";
import company2 from "../../assets/images/clients/02.png";
import company3 from "../../assets/images/clients/03.png";
import company4 from "../../assets/images/clients/04.png";
import company5 from "../../assets/images/clients/05.png";
import company6 from "../../assets/images/clients/06.png";
import company7 from "../../assets/images/clients/07.png";
import Banner from "../../assets/images/clients/Banner.jpg";
import Slider from 'react-infinite-logo-slider';
import "./HomeStyles/OurCustomer.css";

const OurCustomer = () => {
  const companies = [company1, company2, company3, company4, company5, company6, company7];

  return (
    <section className="clients-section" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="viewed">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="bbb_viewed_title_container">
                <div className="col-lg-12">
                  <h2 className="clents-heading">Our Happy Customers From</h2>
                </div>
              </div>
              <Slider
                width="250px"
                duration={40}
                pauseOnHover={true}
                blurBorders={false}
                blurBorderColor={'#fff'}
              >
                {companies.map((company, index) => (
                  <Slider.Slide key={index}>
                    <div className="bbb_viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="bbb_viewed_image">
                        <img src={company} alt="" />
                      </div>
                    </div>
                  </Slider.Slide>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCustomer;