import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { 
  getNormalRowHeight, 
  getNormalColumnWidth,
  isPrepopulateString,
  parsePrepopulateString,
  getAreaDimensions
} from "@tools/excel";

import CellEditor from "./CellEditor";

import Popover, { ArrowContainer } from "react-tiny-popover";

import topOffsetsSelector from "@selectors/ui/excel/topOffsets";
import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";

import BusinessConceptPopup from "./BusinessConceptPopup";
import PrepopulatePopup from "./PrepopulatePopup";
import CommentPopup from "./CommentPopup";
import GroupPopup from "./GroupPopup";

import "./ActiveCell.scss";
import { getBlockStyle } from "@tools/excel";

const ActiveCellDialog = ({
  activeCellDialog,
  position,
  targetRect,
  popoverRect,
  comments,
  value,
  eventListenerRef
}) => {
  const handleKeyDownCapture = (event) => {
    const { key, ctrlKey } = event;

    // if(
    //   key === "ArrowUp" 
    //   || key === "ArrowDown" 
    //   || key === "ArrowRight" 
    //   || key === "ArrowLeft"
    // ) {
      event.stopPropagation();
    // }
  };

  const handleContextMenuCapture = (event) => event.stopPropagation();

  const commonChildrenProps = { 
    eventListenerRef 
  };

  let Children;

  if(activeCellDialog) {
    const { dialog, type } = activeCellDialog;
    if(dialog === "comment") {
      Children = (
        <CommentPopup 
          {...commonChildrenProps}
          comments={comments}
        />
      );
    } else if(dialog === "concept") {
      Children = (
        <BusinessConceptPopup 
          {...commonChildrenProps} 
          type={type} 
        />
      );
    } else if(dialog === "prepopulate") {
      let conceptParameters;
      
      if(typeof value === "string" && isPrepopulateString(value)) {
        conceptParameters = parsePrepopulateString(value);
      } else {
        conceptParameters = {};
      }
  
      Children = (
        <PrepopulatePopup
          {...commonChildrenProps}
          {...conceptParameters}
        />
      );
    } else if(dialog === "group") {
      Children = (
        <GroupPopup
          {...commonChildrenProps}
          type={type}
        />
      );
    }
  }

  return (
    <ArrowContainer
      position={position}
      targetRect={targetRect}
      popoverRect={popoverRect}
      arrowColor="green"
      arrowSize={10}
      arrowStyle={{ opacity: 0.7 }}
    >
      <div
        onKeyDownCapture={handleKeyDownCapture}
        onContextMenuCapture={handleContextMenuCapture}
      >
        {Children}
      </div>
    </ArrowContainer>
  );
};

const ActiveInputCell = ({ 
  activeCellStyle,
  blockStyle,
  activeCellInputAutoFocus,
  eventListenerRef
}) => {
  const handleReturn = (event) => {
    const { key, ctrlKey, altKey } = event;
    if(key === "Escape") event.preventDefault();
    return key === "Enter" && (!ctrlKey && !altKey) ? "handled" : "not-handled";
  };

  const handleContextMenuCapture = (event) => event.stopPropagation();
  const handleKeyDownCapture = (event) => {
    const { key, ctrlKey } = event;

    if(
      ctrlKey && key === "a"
    ) event.stopPropagation();
  };

  return (
    <div 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle}
      onContextMenuCapture={handleContextMenuCapture}
      onKeyDownCapture={handleKeyDownCapture}
    >
      <CellEditor
        key="active-cell-input"
        blockStyle={blockStyle}
        eventListenerRef={eventListenerRef}
        readOnly={!activeCellInputAutoFocus}
        handleReturn={handleReturn}
      />
    </div>
  );
};

const ActiveNormalCell = ({ 
  activeCellStyle,
  activeCellDialog,
  comments,
  value,
  eventListenerRef
}) => {

  return (
    activeCellDialog 
      ? <Popover
          isOpen={activeCellDialog}
          position="right"
          transitionDuration={0}
          content={(props) => (
            <ActiveCellDialog 
              {...props}
              activeCellDialog={activeCellDialog}
              comments={comments}
              value={value}
              eventListenerRef={eventListenerRef}
            />  
          )}
        >
          <div 
            key="inactive-cell-input" 
            className="activeCell activeCell--normalMode" 
            style={activeCellStyle}
          />
        </Popover>
      : <div 
          key="inactive-cell-input" 
          className="activeCell activeCell--normalMode" 
          style={activeCellStyle}
        />

  );
};

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputData: { editorState },
      activeCellInputAutoFocus,
      activeCellPosition,

      isEditMode,
      activeCellDialog,

      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      sheetColumnCount,
      sheetRowCount,
      sheetColumnWidths,
      sheetRowHeights,
      sheetCellData
    }
  }
}) => ({
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,
  activeCellDialog,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetCellData,

  topOffsets: topOffsetsSelector({ sheetRowHeights, sheetRowCount }),
  leftOffsets: leftOffsetsSelector({ sheetColumnWidths, sheetColumnCount })
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

  sheetCellData,

  isActiveCellInCorrectPane,
  activeCellDialog,

  computeActiveCellStyle,

  topOffsets,
  leftOffsets,

  eventListenerRef
}) => {
  const { x, y } = activeCellPosition;

  useEffect(() => {
    if(isEditMode) eventListenerRef.current.resetActiveCellDialog();
  }, [ isEditMode ]);

  useEffect(() => {
    if(activeCellDialog) eventListenerRef.current.resetActiveCellDialog();
  }, [ x, y ]);

  if(!isActiveCellInCorrectPane(x, y, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  let activeCellStyle;

  let top = topOffsets[y];
  let left = leftOffsets[x];

  if(computeActiveCellStyle) {
    activeCellStyle = computeActiveCellStyle(x, y, sheetColumnWidths, leftOffsets, sheetRowHeights, topOffsets, sheetFreezeColumnCount, sheetFreezeRowCount, sheetCellData);
    activeCellStyle.minHeight = activeCellStyle.height;
    activeCellStyle.minWidth = activeCellStyle.width;
  } else {
    let height = getNormalRowHeight(sheetRowHeights[y]);
    let width = getNormalColumnWidth(sheetColumnWidths[x]);

    if(sheetCellData[y] && sheetCellData[y][x]) {
      const { merged } = sheetCellData[y][x];

      if(merged) {
        const { x1, y1, x2, y2 } = merged;
        const mergeDimensions = getAreaDimensions({ 
          x1, y1, x2, y2,
          topOffsets,
          leftOffsets,
          sheetColumnWidths,
          sheetRowHeights
         });

         height = mergeDimensions.height;
         width = mergeDimensions.width;

         top = topOffsets[y1];
         left = leftOffsets[x1];
      }
    };

    activeCellStyle = {
      top, 
      left,
      height,
      width,
      minHeight: height,
      minWidth: width
    }
  }

  activeCellStyle.maxWidth = (leftOffsets[sheetColumnCount - 1] + getNormalColumnWidth(sheetColumnWidths[sheetColumnCount])) - leftOffsets[x];
  activeCellStyle.maxHeight = (topOffsets[sheetRowCount - 1] + getNormalRowHeight(sheetRowHeights[sheetRowCount])) - topOffsets[y];

  let displayedComments = [];
  let displayedValue = "";
  let blockStyle = {};


  if(sheetCellData[y] && sheetCellData[y][x]) {
    const { 
      comments,
      styles, 
      value 
    } = sheetCellData[y][x];

    if(styles) blockStyle = styles;
    if(comments) displayedComments = comments;
    if(value) displayedValue = value;
  }

  return (
    isEditMode 
      ? <ActiveInputCell 
          activeCellStyle={activeCellStyle} 
          blockStyle={blockStyle}
          editorState={editorState}
          activeCellInputAutoFocus={activeCellInputAutoFocus}
          eventListenerRef={eventListenerRef}
        />
      : <ActiveNormalCell 
          activeCellStyle={activeCellStyle}
          activeCellDialog={activeCellDialog}
          comments={displayedComments}
          value={displayedValue}
          eventListenerRef={eventListenerRef}
        />
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;