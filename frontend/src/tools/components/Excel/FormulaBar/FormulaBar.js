import React, { useCallback } from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";

import Divider from "@material-ui/core/Divider";

import { Editable, Slate } from "slate-react";

import { setActiveCellInputValue } from "@actions/ui/excel/commands";

import {
  keyEnter,
  keyTab,
  keyEscape
} from "@actions/ui/excel/keyboard";

import "./FormulaBar.scss";

const Leaf = ({ attributes, children }) =>  <span {...attributes}>{children}</span>;

// ! Only one element for now
const Element = ({ attributes, children }) => (
  <p {...attributes}>{children}</p>
);

const InputField = ({ 
  sheetGridRef,
  sheetContainerRef
}) => {
  const dispatch = useDispatch();

  const renderElement = useCallback((props) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, []);

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;

      if(key === "Enter") {
        event.preventDefault();
        dispatch(
          keyEnter(
            {
              sheetGridRef,
              sheetContainerRef
            }
          )
        );
      } else if(key === "Tab") {
        event.preventDefault();
        dispatch(
          keyTab({
            sheetGridRef,
            sheetContainerRef
          }
        ));
      } else if(key === "Escape") {
        dispatch(keyEscape(sheetContainerRef));
      } else {

      }
    },
    [ dispatch ]
  );

  const {
    formulaEditor,
    formulaValue
  } = useSelector(
    ({
      ui: {
        excel: {
          present: {
            activeCellInputData
          }
        }
      }
    }) => activeCellInputData,
    shallowEqual
  );

  const handleInputChange = useCallback(
    (value) => dispatch(setActiveCellInputValue({ value, input: "formula" })),
    [ dispatch ]
  );

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
      />
    </Slate>
  );
};

const FormulaBar = ({ sheetGridRef, sheetContainerRef }) => (
  <div className="formulaBar">
    <div className="formulaBar__icon">fx</div>
    <Divider orientation="vertical" light/>
    <InputField 
      sheetContainerRef={sheetContainerRef}
      sheetGridRef={sheetGridRef}
    />
  </div>
);

export default FormulaBar;