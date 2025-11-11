import React, { useEffect } from "react";
import CropDeatilsPage from "./CropDeatilsPage";
import Slider from "../components/Slider";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div>
      <Slider />
    </div>
  );
};

export default HomePage;
