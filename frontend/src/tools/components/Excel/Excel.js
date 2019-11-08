import React from "react";

import AppBar from "./AppBar";

const Excel = ({ name, homeLink }) => {

  const handleSubmitName = (name) => {
    console.log(name);
  };

  return (
    <div>
      <AppBar name={name} homeLink={homeLink} handleSubmitName={handleSubmitName}/>
    </div>
  );
};

export default Excel;