import React from "react";

import { connect } from "react-redux";

import Divider from "@material-ui/core/Divider";

import InputBase from "@material-ui/core/InputBase";

import "./FormulaBar.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputData: { rawText }
    }
  }
}) => ({
  rawText
});

let InputField = ({ 
  eventListenerRef, 
  sheetContainerRef,
  rawText
}) => {

  const handleKeyDown = (event) => {
    const { key } = event;

    if(key === "Enter") {
      eventListenerRef.current.enter(event, false, sheetContainerRef);
    } else if(key === "Tab") {
      eventListenerRef.current.tab(event, false, sheetContainerRef);
    } else if(key === "Escape") {
      eventListenerRef.current.escape(sheetContainerRef);
    }
  };

  const handleChange = ({ target: { value } }) => eventListenerRef.current.changeActiveInputData({ rawText: value });
  const handleFocus = () => eventListenerRef.current.focusFormulaInput();
  const handleBlur = () => eventListenerRef.current.blurFormulaInput();

  return (
    <InputBase
      className="formulaBar__input"
      type="text"
      value={rawText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      fullWidth
    />
  )
};

InputField = connect(mapStateToProps)(InputField);

const FormulaBar = ({ eventListenerRef, sheetContainerRef }) => {

  return (
    <div className="formulaBar">
      <div className="formulaBar__icon">fx</div>
      <Divider orientation="vertical" light/>
      <InputField eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
    </div>
  );
};

export default FormulaBar;