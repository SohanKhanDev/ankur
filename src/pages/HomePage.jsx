import React, { useEffect } from "react";
import CropDeatilsPage from "./CropDeatilsPage";
import Slider from "../components/Slider";
import TestimonialsSlider from "../components/TestimonialsSlider";
import HowItWorks from "../components/HowItWorks";
import WhyChooseAnkur from "../components/WhyChooseAnkur";
import AgroNews from "../components/AgroNews";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <div data-aos="fade-down" data-aos-duration="1000">
        <Slider />
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <HowItWorks />
      </div>

      <div
        data-aos="fade-left"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <WhyChooseAnkur />
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <TestimonialsSlider />
      </div>

      <div
        data-aos="fade-left"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <AgroNews />
      </div>
    </div>
  );
};

export default HomePage;
