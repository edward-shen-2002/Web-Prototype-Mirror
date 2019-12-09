import React, { useState, useEffect, useRef, useMemo } from "react";

import { connect } from "react-redux";

import { Editor } from "draft-js";

import { getTopOffsets, getLeftOffsets, getNormalRowHeight, getNormalColumnWidth } from "tools/excel";

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
    <div className="activeCell activeCell--editMode" style={activeCellStyle}>
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
      activeCellPosition,

      isEditMode,

      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      sheetColumnCount,
      sheetRowCount,
      sheetColumnWidths,
      sheetRowHeights
    }
  }
}) => ({
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights
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
    activeCellStyle.minHeight = activeCellStyle.height;
    activeCellStyle.minWidth = activeCellStyle.width;
  } else {
    let height = getNormalRowHeight(sheetRowHeights[y]);
    let width = getNormalColumnWidth(sheetColumnWidths[x]);

    activeCellStyle = {
      top: topOffsets[y], 
      left: leftOffsets[x], 
      height,
      width,
      minHeight: height,
      minWidth: width
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