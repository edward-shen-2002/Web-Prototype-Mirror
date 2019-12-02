import React from "react";

import { connect } from "react-redux";

import Divider from "@material-ui/core/Divider";

import InputBase from "@material-ui/core/InputBase";

import { Editor } from "draft-js";

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

let InputField = ({ 
  eventListenerRef, 
  sheetContainerRef,
  activeCellInputValue
}) => {

  const handleKeyDown = ({ key }) => {
    const { current: EventListenerInstance } = eventListenerRef;
  
    if(key === "Enter") {
      EventListenerInstance.enter(event, false, sheetContainerRef);
    } else if(key === "Tab") {
      EventListenerInstance.tab(event, false, sheetContainerRef);
    } else if(key === "Escape") {
      EventListenerInstance.escape(sheetContainerRef);
    }
  };

  const handleChange = ({ target: { value } }) => eventListenerRef.current.changeActiveInputValue(value);
  const handleFocus = () => eventListenerRef.current.focusFormulaInput();
  const handleBlur = () => eventListenerRef.current.blurFormulaInput();

  // return (
  //   <Editor
  //     editorState={activeCellInputValue}
  //   />
  // );

  return (
    <InputBase
      className="formulaBar__input"
      type="text"
      value={activeCellInputValue}
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
      <Divider orientation="vertical"/>
      <InputField eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
    </div>
  );
};

export default FormulaBar;