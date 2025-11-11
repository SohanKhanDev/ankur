import React, { useEffect } from "react";
import CropDeatilsPage from "./CropDeatilsPage";
import Slider from "../components/Slider";
import TestimonialsSlider from "../components/TestimonialsSlider";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div>
      <Slider />
      <TestimonialsSlider />
    </div>
  );
};

export default HomePage;
