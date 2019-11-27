import React from "react";

import { connect } from "react-redux";

import Divider from "@material-ui/core/Divider";

import InputBase from "@material-ui/core/InputBase";

import "./FormulaBar.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputValue
    }
  }
}) => ({
  activeCellInputValue
});

let InputField = ({ activeCellInputValue }) => {

  const handleChange = () => {

  };

  return (
    <InputBase
      className="formulaBar__input"
      type="text"
      value={activeCellInputValue}
      onChange={handleChange}
      fullWidth
    />
  )
};

InputField = connect(mapStateToProps)(InputField);

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