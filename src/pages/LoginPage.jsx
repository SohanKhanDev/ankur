import React, { useEffect } from "react";

const LoginPage = () => {
  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "LOGIN | ANKUR";
  }, []);

  return (
    <div>
      <h1>LoginPage</h1>
    </div>
  );
};

export default LoginPage;
