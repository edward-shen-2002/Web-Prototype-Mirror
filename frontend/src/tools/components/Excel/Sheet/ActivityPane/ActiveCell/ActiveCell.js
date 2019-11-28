import React from "react";

import { connect } from "react-redux";

import "./ActiveCell.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputValue,
      activeCellInputAutoFocus
    }
  }
}) => ({
  activeCellInputValue,
  activeCellInputAutoFocus
});

let ActiveInputCell = ({ 
  activeCellStyle,
  activeCellInputValue,
  activeCellInputAutoFocus,
  handleChangeActiveInputValue
}) => {
  const handleChangeInputValue = ({ target: { value } }) => handleChangeActiveInputValue(value);

  return (
    <input 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle} 
      value={activeCellInputValue}
      onChange={handleChangeInputValue}
      autoFocus={activeCellInputAutoFocus}
    />
  );
};

ActiveInputCell = connect(mapStateToProps)(ActiveInputCell);

const ActiveCell = ({ isNormalMode, activeCellStyle, handleChangeActiveInputValue }) => (
  isNormalMode 
    ? <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
    : <ActiveInputCell 
        activeCellStyle={activeCellStyle} 
        handleChangeActiveInputValue={handleChangeActiveInputValue}
      />
);

export default ActiveCell;