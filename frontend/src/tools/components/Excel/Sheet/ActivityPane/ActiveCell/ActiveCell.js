import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { Editor } from "draft-js";

import "./ActiveCell.scss";

const ActiveInputCell = ({ 
  activeCellStyle,
  editorState,
  activeCellInputAutoFocus,
  handleChangeActiveInputData
}) => {
  const [ isMounted, setIsMounted ] = useState(false);
  const editorRef = useRef(null);
  const handleChangeInputValue = (newEditorState) => handleChangeActiveInputData({ editorState: newEditorState });

  useEffect(() => {
    if(!isMounted) {
      // if(!activeCellInputAutoFocus) editorRef.current.blur();
      setIsMounted(true);
    }
  });

  const handleReturn = ({ key, ctrlKey, altKey }) => key === "Enter" && (!ctrlKey && !altKey) ? "handled" : "not-handled";

  return (
    <div className="activeCell activeCell--editMode" style={{ ...activeCellStyle, minHeight: "fit-content" }}>
      <Editor
        key="active-cell-input"
        ref={editorRef}
        editorState={editorState}
        onChange={handleChangeInputValue}
        readOnly={!activeCellInputAutoFocus}
        handleReturn={handleReturn}
      />
    </div>
  );
};

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputData: { editorState },
      activeCellInputAutoFocus,
      activeSheetName,
      activeCellPosition,

      isEditMode,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,

      sheetsColumnWidthsData,
      sheetsRowHeightsData
    }
  }
}) => ({
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],

  sheetColumnWidthsData: sheetsColumnWidthsData[activeSheetName],
  sheetRowHeightsData: sheetsRowHeightsData[activeSheetName]
});

let ActiveCell = ({ 
  isEditMode, 
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidthsData: { columnWidths, leftOffsets },
  sheetRowHeightsData: { rowHeights, topOffsets },

  isActiveCellInCorrectPane,

  computeActiveCellStyle,

  handleChangeActiveInputData
}) => {
  const { x, y } = activeCellPosition;

  if(!isActiveCellInCorrectPane(x, y, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  const activeCellStyle = (
    computeActiveCellStyle 
      ? computeActiveCellStyle(x, y, columnWidths, leftOffsets, rowHeights, topOffsets, sheetFreezeColumnCount, sheetFreezeRowCount)
      : { top: topOffsets[y], left: leftOffsets[x], height: rowHeights[y], width: columnWidths[x] }
  );

  return (
    isEditMode 
      ? <ActiveInputCell 
          activeCellStyle={activeCellStyle} 
          editorState={editorState}
          activeCellInputAutoFocus={activeCellInputAutoFocus}
          handleChangeActiveInputData={handleChangeActiveInputData}
        />
      : <div key="inactive-cell-input" className="activeCell activeCell--normalMode" style={activeCellStyle}/>
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;