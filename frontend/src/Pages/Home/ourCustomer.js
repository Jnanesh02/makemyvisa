import React from "react";
import company1 from "../../assets/images/clients/01.png";
import company2 from "../../assets/images/clients/02.png";
import company3 from "../../assets/images/clients/03.png";
import company4 from "../../assets/images/clients/04.png";
import company5 from "../../assets/images/clients/05.png";
import company6 from "../../assets/images/clients/06.png";
import company7 from "../../assets/images/clients/07.png";
import Banner from "../../assets/images/clients/Banner.jpg";
import Carousel from "react-grid-carousel";
import "./ourCustomer.css";

const OurCustomer = () => {
  

  const companies = [company1, company2, company3, company4, company5, company6, company7];

  // Duplicate the companies to create an infinite loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <div>
      <section
        className="clients-section"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="viewed">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="bbb_viewed_title_container">
                  <div className="col-lg-12">
                    <h2 className="clents-heading text-center mb-3"> Our Happy Customers From </h2>
                  </div>
                </div>

                <Carousel cols={5} rows={1} gap={1} loop={true} autoplay={2000}>
                  {duplicatedCompanies.map((company, index) => (
                    <Carousel.Item key={index}>
                      <img src={company} className="companyies"  alt={`Company ${index + 1}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCustomer;
