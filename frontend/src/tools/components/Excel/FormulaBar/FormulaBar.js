import React, { useCallback } from "react";

import Divider from "@material-ui/core/Divider";

import { Editable, Slate } from "slate-react";

import "./FormulaBar.scss";

const Leaf = ({ attributes, children, leaf }) =>  <span {...attributes}>{children}</span>;

// ! Only one element for now
const Element = ({ attributes, children, element }) => (
  <p {...attributes}>{children}</p>
);

const InputField = ({ 
  eventListenerRef, 
  sheetContainerRef
}) => {
  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const handleKeyDown = (event) => {
    const { key } = event;

    if(key === "Enter") {
      event.preventDefault();
      eventListenerRef.current.enter(event, false, sheetContainerRef);
    } else if(key === "Tab") {
      eventListenerRef.current.tab(event, false, sheetContainerRef);
    } else if(key === "Escape") {
      eventListenerRef.current.escape(sheetContainerRef);
    } else {

    }
  };

  const handleFocus = () => eventListenerRef.current.focusFormulaInput();
  const handleBlur = () => eventListenerRef.current.blurFormulaInput();

  return (
    <Editable
      className="formulaBar__input"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

const FormulaBar = ({ 
  eventListenerRef, 
  sheetContainerRef 
}) => {

  return (
    <div className="formulaBar">
      <div className="formulaBar__icon">fx</div>
      <Divider orientation="vertical" light/>
      <InputField eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
    </div>
  );
};

export default FormulaBar;