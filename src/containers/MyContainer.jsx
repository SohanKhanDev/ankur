import React from "react";

const MyContainer = ({ className, children }) => {
  return (
    <div className={`container mx-auto main-font ${className}`}>{children}</div>
  );
};

export default MyContainer;
