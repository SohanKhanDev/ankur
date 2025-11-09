import React, { use, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvide";

const RegisterPage = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "REGISTER | ANKUR";
  }, []);

  return (
    <div>
      <h1>RegisterPage</h1>
    </div>
  );
};

export default RegisterPage;
