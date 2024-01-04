import React from "react";

import CertificationSection from "./certificationSection";
import SlideSection from "./slideSection";
import CountriesSection from "./CountriesSection";
import Award from "../Award/Award";

const Home = () => {
  return (
    <>
      <SlideSection />
      <CountriesSection/>
      <Award/>
      <CertificationSection />
     
    </>
  );
};

export default Home;
