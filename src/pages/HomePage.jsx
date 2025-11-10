import React, { useEffect } from "react";
import CropDeatilsPage from "./CropDeatilsPage";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div>
      <h1>HomePage</h1>
      <CropDeatilsPage></CropDeatilsPage>
    </div>
  );
};

export default HomePage;
