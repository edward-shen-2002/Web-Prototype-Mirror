import React from "react";

import Divider from "@material-ui/core/Divider";

import InputBase from "@material-ui/core/InputBase";

import "./FormulaBar.scss";

const InputField = () => {

  return (
    <InputBase
      className="formulaBar__input"
      type="text"
      fullWidth
    />
  )
};

const FormulaBar = () => {

  return (
    <div className="formulaBar">
      <div className="formulaBar__icon">fx</div>
      <Divider orientation="vertical"/>
      <InputField/>
    </div>
  );
};

export default FormulaBar;