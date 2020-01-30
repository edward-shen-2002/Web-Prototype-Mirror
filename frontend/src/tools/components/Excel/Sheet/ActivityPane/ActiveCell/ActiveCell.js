import React, { useState, useEffect, useRef, useMemo } from "react";

import { connect } from "react-redux";

import { Editor } from "draft-js";

import Popover, { ArrowContainer } from "react-tiny-popover";

import { getTopOffsets, getLeftOffsets, getNormalRowHeight, getNormalColumnWidth } from "@tools/excel";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "./ActiveCell.scss";

const CommentDialogActions = ({
  handleSaveComment,
  handleCloseCommentDialog
}) => (
  <ButtonGroup fullWidth>
    <Button onClick={handleSaveComment}>Save</Button>
    <Button onClick={handleCloseCommentDialog}>Cancel</Button>
  </ButtonGroup>
);

const CommentDialog = ({
  position,
  targetRect,
  popoverRect,
  handleCloseCommentDialog
}) => {
  const textFieldRef = useRef();

  useEffect(() => {
    textFieldRef.current.focus();
  }, [ textFieldRef ]);

  const handleClick = () => textFieldRef.current.focus();

  const handleKeyDownCapture = (event) => event.stopPropagation();

  const handleContextMenuCapture = (event) => event.stopPropagation();

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
        className="comment" 
        onClick={handleClick}
        onKeyDownCapture={handleKeyDownCapture}
        onContextMenuCapture={handleContextMenuCapture}
      >
        <Typography variant="h6" className="comment__label">Comment</Typography>
        <TextField 
          inputRef={textFieldRef}
          className="comment__field" 
          variant="outlined"
          multiline={true}
        />
        <CommentDialogActions
          handleCloseCommentDialog={handleCloseCommentDialog}
        />
      </div>
    </ArrowContainer>
  );
};

const ActiveInputCell = ({ 
  activeCellStyle,
  activeCellInputAutoFocus,
  editorState,
  handleChangeActiveInputData
}) => {
  const [ isMounted, setIsMounted ] = useState(false);
  const editorRef = useRef(null);
  const handleChangeInputValue = (newEditorState) => {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newEditorState.getCurrentContent();

    if(currentContentState !== newContentState) handleChangeActiveInputData({ editorState: newEditorState });
  };

  useEffect(() => {
    if(!isMounted) {
      // if(activeCellInputAutoFocus) editorRef.current.focus();
      setIsMounted(true);
    }
  });

  const handleReturn = (event) => {
    const { key, ctrlKey, altKey } = event;
    if(key === "Escape") event.preventDefault();
    return key === "Enter" && (!ctrlKey && !altKey) ? "handled" : "not-handled";
  };

  const handleContextMenuCapture = (event) => event.stopPropagation();

  return (
    <div 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle}
      onContextMenuCapture={handleContextMenuCapture}
    >
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

const ActiveNormalCell = ({ 
  activeCellStyle,
  isCommentDialogOpen,
  handleCloseCommentDialog
}) => {

  return (
    isCommentDialogOpen 
      ? <Popover
          isOpen={isCommentDialogOpen}
          position="right"
          transitionDuration={0}
          content={(props) => (
            <CommentDialog 
              {...props}
              handleCloseCommentDialog={handleCloseCommentDialog}
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
      isCommentDialogOpen,

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
  isCommentDialogOpen,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetCellData
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
  isCommentDialogOpen,

  computeActiveCellStyle,

  handleChangeActiveInputData,
  handleCloseCommentDialog
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

  useEffect(() => {
    if(isCommentDialogOpen) handleCloseCommentDialog();
  }, [ x, y ]);

  return (
    isEditMode 
      ? <ActiveInputCell 
          activeCellStyle={activeCellStyle} 
          editorState={editorState}
          activeCellInputAutoFocus={activeCellInputAutoFocus}
          handleChangeActiveInputData={handleChangeActiveInputData}
        />
      : <ActiveNormalCell 
          activeCellStyle={activeCellStyle}
          isCommentDialogOpen={isCommentDialogOpen}
          handleCloseCommentDialog={handleCloseCommentDialog}
        />
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;