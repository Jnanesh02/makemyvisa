import React from "react";

import CertificationSection from "./certificationSection";
import SlideSection from "./slideSection";
import CountriesSection from "./CountriesSection";
import Award from "./Award/Award";
import OurCustomer from "./ourCustomer";
import Testimonials from "./testimonials";

const Home = () => {
  return (
    <>
      <SlideSection />
      <CountriesSection/>
      <Award/>
      <Testimonials/>
      <OurCustomer/>
      
      <CertificationSection />
     
    </>
  );
};

export default Home;
