import React from "react";

import CertificationSection from "./CertificationSection";
import SlideSection from "./SlideSection";
import CountriesSection from "./CountriesSection";
import Award from "./Award";
import OurCustomer from "./OurCustomer";
import Testimonials from "./Testimonials";

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
