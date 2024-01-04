import React from "react";

import CertificationSection from "./certificationSection";
import SlideSection from "./slideSection";
import CountriesSection from "./CountriesSection";
import "./Home.css";
const Home = () => {
  return (
    <>
      <SlideSection />
      <CountriesSection/>
      <CertificationSection />
     
    </>
  );
};

export default Home;
