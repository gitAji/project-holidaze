import React from "react";
import Meta from "../utils/meta";
import Venues from "../components/venues";

const VenuesPage = () => {
  return (
    <>
      <Meta
        title="Venues"
        description="Holidaze is a booking agency for hotels and other accommondation. We offer a wide range of accomodations in Bergen, Norway."
      ></Meta>
      <Venues />
    </>
  );
};

export default VenuesPage;
