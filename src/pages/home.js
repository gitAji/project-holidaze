import React from "react";
import Slideshow from "../components/home/slides/slides";
import Meta from "../utils/meta";
import CTA from "../components/home/CTA";
import ScrollToTop from "../utils/scrollToTop";

const Home = () => {
  return (
    <>
      <Meta
        title="Home"
        description="Holidaze is a booking agency for hotels and other accomodations. We offer a wide range of accomodations in Bergen, Norway."
      ></Meta>

      <Slideshow />

      <CTA />

      <ScrollToTop />
    </>
  );
};

export default Home;
