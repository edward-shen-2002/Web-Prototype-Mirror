import React, { useState, useEffect, useRef, useMemo } from "react";

import { connect } from "react-redux";

import { Editor } from "draft-js";

import { getTopOffsets, getLeftOffsets, getNormalRowHeight, getNormalColumnWidth } from "tools/excel";

import { DEFAULT_EXCEL_SHEET_ROW_HEIGHT, DEFAULT_EXCEL_SHEET_COLUMN_WIDTH } from "constants/excel";

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

      sheetsColumnCount,
      sheetsRowCount,
      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,

      sheetsColumnWidths,
      sheetsRowHeights
    }
  }
}) => ({
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],

  sheetColumnCount: sheetsColumnCount[activeSheetName],
  sheetRowCount: sheetsRowCount[activeSheetName],

  sheetColumnWidths: sheetsColumnWidths[activeSheetName],
  sheetRowHeights: sheetsRowHeights[activeSheetName]
});

let ActiveCell = ({ 
  isEditMode, 
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnCount,
  sheetRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  isActiveCellInCorrectPane,

  computeActiveCellStyle,

  handleChangeActiveInputData
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  const { x, y } = activeCellPosition;

  if(!isActiveCellInCorrectPane(x, y, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  let activeCellStyle;

  if(computeActiveCellStyle) {
    activeCellStyle = computeActiveCellStyle(x, y, sheetColumnWidths, leftOffsets, sheetRowHeights, topOffsets, sheetFreezeColumnCount, sheetFreezeRowCount);
  } else {
    let height = getNormalRowHeight(sheetRowHeights[y]);
    let width = getNormalColumnWidth(sheetColumnWidths[x]);

    activeCellStyle = {
      top: topOffsets[y], 
      left: leftOffsets[x], 
      height,
      width
    }
  }

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