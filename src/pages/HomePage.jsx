import React, { useEffect } from "react";
import CropDeatilsPage from "./CropDeatilsPage";
import Slider from "../components/Slider";
import TestimonialsSlider from "../components/TestimonialsSlider";
import HowItWorks from "../components/HowItWorks";
import WhyChooseAnkur from "../components/WhyChooseAnkur";
import AgroNews from "../components/AgroNews";
import LatestCrops from "../components/LatestCrops";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div>
      <div>
        <Slider />
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <LatestCrops />
      </div>

      <div>
        <HowItWorks />
      </div>

      <div>
        <WhyChooseAnkur />
      </div>

      <div>
        <TestimonialsSlider />
      </div>

      <div>
        <AgroNews />
      </div>
    </div>
  );
};

export default HomePage;
