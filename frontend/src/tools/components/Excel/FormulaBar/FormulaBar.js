import React, { useCallback } from "react";

import { useSelector, shallowEqual } from "react-redux";

import Divider from "@material-ui/core/Divider";

import { Editable, Slate } from "slate-react";

import "./FormulaBar.scss";

const Leaf = ({ attributes, children }) =>  <span {...attributes}>{children}</span>;

// ! Only one element for now
const Element = ({ attributes, children }) => (
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

  const {
    formulaEditor,
    formulaValue
  } = useSelector(
    ({
      ui: {
        excel: {
          activeCellInputData
        }
      }
    }) => activeCellInputData,
    shallowEqual
  );

  const handleFocus = () => eventListenerRef.current.focusFormulaInput();
  const handleBlur = () => eventListenerRef.current.blurFormulaInput();

  const handleInputChange = useCallback((formulaValue) => {
    eventListenerRef.current.changeActiveInputData({ formulaValue });
  });

  return (
    <Slate
      editor={formulaEditor}
      value={formulaValue}
      onChange={handleInputChange}
    >
      <Editable
        className="formulaBar__input"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Slate>
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