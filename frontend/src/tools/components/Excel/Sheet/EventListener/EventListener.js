import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

import { setSelectionModeOn, setSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import { setEditModeOn, setEditModeOff } from "actions/ui/excel/isEditMode";

const mapStateToProps = ({ 
  ui: { 
    excel: { 
      selectionArea, 
      isSelectionMode, 
      isEditMode,

      columnCount,
      rowCount
    } 
  } 
}) => ({ 
  selectionArea, 
  isSelectionMode, 
  isEditMode,
  columnCount,
  rowCount
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea)),
  
  handleSetSelectionModeOn: () => dispatch(setSelectionModeOn()),
  handleSetSelectionModeOff: () => dispatch(setSelectionModeOff()),

  handleSetEditModeOn: () => dispatch(setEditModeOn()),
  handleSetEditModeOff: () => dispatch(setEditModeOff())
});

let EventListener = ({ 
  eventListenerRef, 
  selectionArea, 
  columnCount,
  rowCount,
  isSelectionMode,

  isEditMode,

  sheet,

  handleUpdateSelectionArea,

  handleSetSelectionModeOn,
  handleSetSelectionModeOff,

  handleSetEditModeOn,
  handleSetEditModeOff
}) => (
  <EventRedux 
    ref={eventListenerRef} 
    rowCount={rowCount}
    columnCount={columnCount}
    selectionArea={selectionArea}
    isSelectionMode={isSelectionMode}
    isEditMode={isEditMode}

    sheet={sheet}

    handleUpdateSelectionArea={handleUpdateSelectionArea}
    
    handleSetSelectionModeOn={handleSetSelectionModeOn}
    handleSetSelectionModeOff={handleSetSelectionModeOff}

    handleSetEditModeOn={handleSetEditModeOn}
    handleSetEditModeOff={handleSetEditModeOff}
  />
);

EventListener = connect(mapStateToProps, mapDispatchToProps)(EventListener);

export default EventListener;

class EventRedux extends PureComponent {
  constructor(props) {
    super(props);
  }

  tab(sheetContainerRef, event) {
    const { selectionArea, columnCount, sheet, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1++;

    event.preventDefault();
    sheetContainerRef.current.focus();

    if(x1 < columnCount) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }

    this.setEditModeOff();
  }

  shiftTab(sheetContainerRef, event) {
    const { selectionArea, sheet, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1--;

    event.preventDefault();
    sheetContainerRef.current.focus();

    if(x1 > 0) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }

    this.setEditModeOff();
  }

  ctrlA(event) {
    const { rowCount, isEditMode, columnCount, handleUpdateSelectionArea } = this.props;

    if(isEditMode) return;

    event.preventDefault();

    handleUpdateSelectionArea({ x1: 1, y1: 1, x2: columnCount - 1, y2: rowCount - 1 });
  }

  enter(sheetContainerRef, event) {
    const { selectionArea, sheet, rowCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1++;

    event.preventDefault();
    sheetContainerRef.current.focus();
    
    if(y1 < rowCount) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }

    this.setEditModeOff();
  }

  esc(sheetContainerRef) {
    this.setEditModeOff();
    sheetContainerRef.current.focus();
  }

  moveUp(event) {
    const { isEditMode } = this.props;
    if(isEditMode) return;

    const { selectionArea, sheet, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    y1--;

    event.preventDefault();

    if(y1 > 0) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }
  }

  moveDown(event) {
    const { isEditMode } = this.props;
    if(isEditMode) return;

    const { selectionArea, sheet, rowCount, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    
    y1++;

    event.preventDefault();
    
    if(y1 < rowCount) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }
  }

  moveLeft(event) {
    const { isEditMode } = this.props;
    if(isEditMode) return;

    const { selectionArea, sheet, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1--;

    event.preventDefault();

    if(x1 > 0) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }
  }

  moveRight(event) {
    const { isEditMode } = this.props;
    if(isEditMode) return;

    const { selectionArea, columnCount, sheet, handleUpdateSelectionArea } = this.props;
    let { x1, y1 } = selectionArea;

    x1++;

    event.preventDefault();

    if(x1 < columnCount) {
      handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
      sheet.activeCell(y1, x1);
    }
  }

  startSelectionArea(selectionArea) {
    const { isSelectionMode, sheet, handleUpdateSelectionArea, handleSetSelectionModeOn } = this.props;
    if(!isSelectionMode) handleSetSelectionModeOn();

    const { x1, y1 } = selectionArea;

    sheet.activeCell(y1, x1);

    this.setEditModeOff();

    handleUpdateSelectionArea(selectionArea);
  }

  updateSelectionArea(selectionArea) {
    const { isSelectionMode, handleUpdateSelectionArea } = this.props;
    if(isSelectionMode) handleUpdateSelectionArea(selectionArea);
  }

  selectColumnHeader(column) {
    const { rowCount, handleUpdateSelectionArea } = this.props;

    this.setEditModeOff();
    
    handleUpdateSelectionArea({ x1: column, y1: 1, x2: column, y2: rowCount - 1 });
  }

  selectRowHeader(row) {
    const { columnCount, handleUpdateSelectionArea } = this.props;

    this.setEditModeOff();

    handleUpdateSelectionArea({ x1: 1, y1: row, x2: columnCount - 1, y2: row });
  }

  selectRootHeader() {
    const { rowCount, columnCount, handleUpdateSelectionArea } = this.props;

    this.setEditModeOff();

    handleUpdateSelectionArea({ x1: 1, y1: 1, x2: columnCount - 1, y2: rowCount - 1 });
  }

  setIsSelectionModeOn() {
    const { isSelectionMode, handleSetSelectionModeOn } = this.props;

    if(!isSelectionMode) handleSetSelectionModeOn();
  }

  setIsSelectionModeOff() {
    const { isSelectionMode, handleSetSelectionModeOff } = this.props;

    if(isSelectionMode) handleSetSelectionModeOff();
  }

  setEditModeOn() {
    const { isEditMode, isSelectionMode, handleSetEditModeOn, handleSetSelectionModeOff } = this.props;
    if(!isEditMode) handleSetEditModeOn();

    if(isSelectionMode) handleSetSelectionModeOff();
  }

  setEditModeOff() {
    const { isEditMode, handleSetEditModeOff } = this.props;

    if(isEditMode) handleSetEditModeOff();
  }

  render() {
    return null;
  }
};