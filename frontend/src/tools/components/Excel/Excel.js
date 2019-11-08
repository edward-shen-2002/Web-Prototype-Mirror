import React from "react";

import AppBar from "./AppBar";

const Excel = ({ name, returnLink }) => {

  const handleSubmitName = (name) => {
    console.log(name);
  };

  return (
    <div>
      <AppBar name={name} returnLink={returnLink} handleSubmitName={handleSubmitName}/>
    </div>
  );
};

export default Excel;