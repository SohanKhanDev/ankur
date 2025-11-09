import React, { useEffect } from "react";

const HomePage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "HOME | ANKUR";
  });

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
